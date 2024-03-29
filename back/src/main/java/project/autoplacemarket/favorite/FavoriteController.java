package project.autoplacemarket.favorite;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import project.autoplacemarket.card.Card;
import project.autoplacemarket.card.CardRepository;
import project.autoplacemarket.user.User;
import project.autoplacemarket.user.UserRepository;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/favorites")
public class FavoriteController {

    private final FavoriteRepository favoriteRepository;
    private final FavoriteService favoriteService;
    private final UserRepository userRepository;
    private final CardRepository cardRepository;


    @GetMapping("/{email}/favoriteList/all")
    public List<Favorite> getFavoritesByEmail(@PathVariable String email) {
        return favoriteService.getFavoritesByEmail(email);
    }


//    @PostMapping("/{email}/favoriteList/add")
    @PostMapping("/{email}/cards/{cardId}")
    public Favorite addToFavorite(@PathVariable String email, @PathVariable Long cardId) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Card card = cardRepository.findById(cardId).orElseThrow(() -> new RuntimeException("Card not found"));

        return favoriteService.addToFavorite(email, cardId);
    }



//    @DeleteMapping("/{email}/favoriteList/delete/{favoriteId}")
//    public void removeFromFavorite(@PathVariable String email, @PathVariable Long favoriteId) {
//        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
//
//        Favorite favoriteToRemove = null;
//        for (Favorite favorite : user.getFavoriteList()) {
//            if (favorite.getId().equals(favoriteId)) {
//                favoriteToRemove = favorite;
//                break;
//            }
//        }
//
//        if (favoriteToRemove != null) {
//
//            user.getFavoriteList().remove(favoriteToRemove);
//            favoriteToRemove.setUser(null);
//            favoriteRepository.save(favoriteToRemove);
//            userRepository.save(user);
//        } else {
//            throw new RuntimeException("Favorite not found");
//        }
//    }


    @DeleteMapping("/{email}/favoriteList/delete/{favoriteId}")
    public void removeFromFavorite(@PathVariable String email, @PathVariable Long favoriteId) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Favorite favoriteToRemove = null;
        for (Favorite favorite : user.getFavoriteList()) {
            if (favorite.getId().equals(favoriteId)) {
                favoriteToRemove = favorite;
                break;
            }
        }

        if (favoriteToRemove != null) {
            // Supprimer la carte associée au favori
            Card cardToRemove = favoriteToRemove.getCard();
            user.getFavoriteList().remove(favoriteToRemove);
            favoriteToRemove.setUser(null);

            favoriteRepository.delete(favoriteToRemove);
            userRepository.save(user);
        } else {
            throw new RuntimeException("Favorite not found");
        }
    }




//    @DeleteMapping("/{email}/favoriteList/delete/{favoriteId}")
//    public void removeFromFavorite(@PathVariable String email, @PathVariable Long favoriteId) {
//        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
//
//        Favorite favoriteToRemove = null;
//        for (Favorite favorite : user.getFavoriteList()) {
//            if (favorite.getId().equals(favoriteId)) {
//                favoriteToRemove = favorite;
//                break;
//            }
//        }
//
//        if (favoriteToRemove != null) {
//
//            user.getFavoriteList().remove(favoriteToRemove);
//            favoriteToRemove.setUser(null);
//            favoriteRepository.save(favoriteToRemove);
//            userRepository.save(user);
//        } else {
//            throw new RuntimeException("Favorite not found");
//        }
//    }


}
