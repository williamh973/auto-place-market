package project.autoplacemarket.favorite;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import project.autoplacemarket.card.Card;
import project.autoplacemarket.card.CardRepository;
import project.autoplacemarket.user.User;
import project.autoplacemarket.user.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final CardRepository cardRepository;

    public List<Favorite> getCurrentUserFavoriteList() {
        User user = getCurrentUser();
        return new ArrayList<>(user.getFavoriteList());
    }



    public Favorite addToFavorite(Long cardId) {

        User user = getCurrentUser();

        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new RuntimeException("Card not found"));

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setCard(card);

        favoriteRepository.save(favorite);
        return favorite;
    }

public Favorite deleteCardFromFavorite(Long favoriteId) {
    Favorite favorite = favoriteRepository.findById(favoriteId)
            .orElseThrow(() -> new RuntimeException("Favori non trouvé"));

    favoriteRepository.delete(favorite);
    return favorite;
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
