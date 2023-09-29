package project.autoplacemarket.card;



import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import project.autoplacemarket.favorite.FavoriteRepository;
import project.autoplacemarket.user.User;
import project.autoplacemarket.user.UserRepository;
import org.springframework.security.core.Authentication;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;
    private final UserRepository userRepository;
    private final FavoriteRepository favoriteRepository;


    public List<Card> getAll() {
        return cardRepository.findAll();
    }



@Transactional
public Card addCard(Card card) {

    User user = getCurrentUser();
    card.setUser(user);
    card.setTimestamp(new Date());

    return cardRepository.save(card);
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
    

    public Card getCardById(Long id) {
        return cardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(id + "not found"));
    }

    public Card updateCard(Card card, Long id) {

        Card foundCard = getCardById(id);
        foundCard.setImage(card.getImage());
        foundCard.setTitle(card.getTitle());
        foundCard.setResume(card.getResume());
        foundCard.setPrice(card.getPrice());
        foundCard.setKilometer(card.getKilometer());
        foundCard.setDoor(card.getDoor());
        foundCard.setTransmission(card.getTransmission());
        foundCard.setFuel(card.getFuel());
        foundCard.setYear(card.getYear());

        return cardRepository.save(foundCard);

    }

@Transactional
public void deleteCard(Long id) {
    Card card = cardRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Card not found"));

    favoriteRepository.deleteByCard(card);
    cardRepository.deleteById(id);
}


}
