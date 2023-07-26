package poecbdx23.livecodingjwt.favorite;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import poecbdx23.livecodingjwt.card.Card;
import poecbdx23.livecodingjwt.card.CardRepository;
import poecbdx23.livecodingjwt.user.User;
import poecbdx23.livecodingjwt.user.UserRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final CardRepository cardRepository;


    public List<Favorite> getFavoritesByEmail(String userEmail) {
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

        User user = optionalUser.get();
        List<Favorite> favoriteList = user.getFavoriteList();

        Optional<Favorite> optionalFavorite = favoriteList.stream()
                .filter(favorite -> favorite.getId().equals(favoriteId))
                .findFirst();

        if (optionalFavorite.isPresent()) {
            Favorite favoriteToRemove = optionalFavorite.get();
            favoriteList.remove(favoriteToRemove);

            userRepository.save(user);
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
