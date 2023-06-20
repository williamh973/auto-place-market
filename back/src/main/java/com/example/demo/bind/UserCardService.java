package com.example.demo.bind;

import com.example.demo.card.Card;
import com.example.demo.card.CardRepository;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserCardService {

    private final UserRepository userRepository;
    private final CardRepository cardRepository;
    public User bindUserWidthCard(Long userId, Long cardId) {
        User foundUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("The userId" + userId + "not found"));

        Card foundCard = cardRepository.findById(cardId)
                    .orElseThrow(() -> new RuntimeException("The cardId" + cardId + "not found"));

        foundUser.getCardList().add(foundCard);

        return userRepository.save(foundUser);
        }
}
