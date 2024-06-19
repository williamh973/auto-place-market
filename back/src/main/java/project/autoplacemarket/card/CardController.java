package project.autoplacemarket.card;



import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/cards")
@RequiredArgsConstructor
public class  CardController {

    private final CardService cardService;


    @GetMapping("/all")
    public List<Card> getAll() {
        return cardService.getAll();
    }

    @GetMapping("/{id}")
    public Card getCardById(@PathVariable("id") Long id) {
        return cardService.getCardById(id);
    }


    @PostMapping("/add")
    public Card addCard(@RequestBody Card card) {
    return cardService.addCard(card);
}

    @PutMapping("/update/{id}")
    public Card updateCard(@RequestBody Card card, @PathVariable("id") Long id) {
        return cardService.updateCard(card, id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCard(@PathVariable("id") Long id) {
        cardService.deleteCard(id);
    }

}
