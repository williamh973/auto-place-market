package poecbdx23.livecodingjwt.card;



import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import poecbdx23.livecodingjwt.favorite.Favorite;
import poecbdx23.livecodingjwt.picture.Picture;
import poecbdx23.livecodingjwt.user.User;

import java.util.ArrayList;
import java.util.List;


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
    @Column(length = 1000)
    private String resume;
    private Number price;
    private Number kilometer;
    private Number door;
    private String transmission;
    private String fuel;
    private Number year;



//    A GARDER ! ! ! ! ! ! ! !
//    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL, orphanRemoval = true)
//    @OneToMany(mappedBy = "card", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("card")
    private List<Picture> picturesList = new ArrayList<>();

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnoreProperties(
            {
                    "favoriteList",
                    "authorities",
                    "cardList",
                    "enabled",
                    "credentialsNonExpired",
                    "accountNonExpired",
                    "accountNonLocked"
            })
    private User user;

}
