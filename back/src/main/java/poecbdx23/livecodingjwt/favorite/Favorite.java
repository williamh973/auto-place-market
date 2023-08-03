package poecbdx23.livecodingjwt.favorite;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import poecbdx23.livecodingjwt.card.Card;
import poecbdx23.livecodingjwt.user.User;

import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "card_id", referencedColumnName = "id")
    @JsonIgnoreProperties("favoriteList")
    private Card card;


    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")

    @JsonIgnore
    private User user;

}
