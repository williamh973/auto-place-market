package project.autoplacemarket.picture;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.autoplacemarket.card.Card;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor


public class Picture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String src;


    @ManyToOne
    @JoinColumn(name = "card_id", referencedColumnName = "id")
    @JsonIgnoreProperties("picturesList")
    private Card card;

}
