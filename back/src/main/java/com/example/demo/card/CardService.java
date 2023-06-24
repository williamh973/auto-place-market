package com.example.demo.card;

import com.example.demo.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;



@Service
@RequiredArgsConstructor
public class CardService {


    private final CardRepository cardRepository;


    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    public Card addCard(Card card) {
        return cardRepository.save(card);
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
        foundCard.setUser(card.getUser());

        return cardRepository.save(foundCard);

    }


    public void deleteCard(Long id) {
        cardRepository.deleteById(id);
    }

    public List<Card> getAll() {
        return cardRepository.findAll();
    }
}
