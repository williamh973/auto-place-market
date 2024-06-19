package project.autoplacemarket.favorite;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/favorites")
public class FavoriteController {
    private final FavoriteService favoriteService;


    @GetMapping("currentUser/all")
    public List<Favorite> getCurrentUserFavoriteList() {
        return favoriteService.getCurrentUserFavoriteList();
    }

    @PostMapping("/add/{cardId}")
    public Favorite addToFavorite(@PathVariable Long cardId) {
        return favoriteService.addToFavorite(cardId);
    }

    @DeleteMapping("/delete/{favoriteId}")
    public Favorite removeFromFavorite(@PathVariable Long favoriteId) {
        return favoriteService.deleteCardFromFavorite(favoriteId);

    }
}
