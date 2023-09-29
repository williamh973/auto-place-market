package project.autoplacemarket.favorite;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import project.autoplacemarket.card.Card;
import project.autoplacemarket.card.CardRepository;
import project.autoplacemarket.user.User;
import project.autoplacemarket.user.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final CardRepository cardRepository;


//    public List<Favorite> getFavoritesByEmail(String userEmail) {
//        return favoriteRepository.findByUserEmail(userEmail);
//    }


    public List<Favorite> getFavoritesByEmail(String userEmail) {
        Optional<User> optionalUser = userRepository.findByEmail(userEmail);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("L'utilisateur avec l'e-mail " + userEmail + " n'a pas été trouvé.");
        }

        User user = optionalUser.get();
        Set<Favorite> favoriteList = user.getFavoriteList();
        return favoriteRepository.findByUserEmail(userEmail);
    }



    public Favorite addToFavorite(String userEmail, Long cardId) {
        Optional<User> optionalUser = userRepository.findByEmail(userEmail);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("L'utilisateur avec l'e-mail " + userEmail + " n'a pas été trouvé.");
        }

        User user = getCurrentUser();

        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new RuntimeException("Card not found"));

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setCard(card);

        favoriteRepository.save(favorite);
        return favorite;
    }

public void removeFromFavorite(String userEmail, Long favoriteId) {
    Optional<User> optionalUser = userRepository.findByEmail(userEmail);

    if (optionalUser.isEmpty()) {
        throw new RuntimeException("L'utilisateur avec l'e-mail " + userEmail + " n'a pas été trouvé.");
    }
    User user = getCurrentUser();

    Favorite favorite = favoriteRepository.findById(favoriteId)
            .orElseThrow(() -> new RuntimeException("Favori non trouvé"));

    if (user.getFavoriteList().remove(favorite)) {
        favorite.setUser(null); // Supprimer la relation entre le favori et l'utilisateur
        favoriteRepository.delete(favorite); // Supprimer le favori de la base de données
        userRepository.save(user); // Enregistrer l'utilisateur mis à jour
    } else {
        throw new RuntimeException("Le favori avec l'ID " + favoriteId + " n'a pas été trouvé pour l'utilisateur avec l'e-mail " + userEmail);
    }
}


    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            throw new RuntimeException("Current user not found");
        }
    }
}
