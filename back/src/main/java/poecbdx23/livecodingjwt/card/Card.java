package poecbdx23.livecodingjwt.card;



import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import poecbdx23.livecodingjwt.user.User;


@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String image;
    private String title;
    private String resume;
    private Number price;
    private Number kilometer;
    private Number door;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnoreProperties("cardList")
    private User user;
}
