package poecbdx23.livecodingjwt.card;



import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import poecbdx23.livecodingjwt.user.User;
import poecbdx23.livecodingjwt.user.UserRepository;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;



@Service
@RequiredArgsConstructor
public class CardService {


    private final CardRepository cardRepository;
    private final UserRepository userRepository;

    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }


    public Card addCard(Card card) {
        User user = getCurrentUser();
        card.setUser(user);
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


    public void deleteCard(Long id) {
        cardRepository.deleteById(id);
    }

    public List<Card> getAll() {
        return cardRepository.findAll();
    }
}
