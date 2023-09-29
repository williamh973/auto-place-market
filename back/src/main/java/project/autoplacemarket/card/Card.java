package project.autoplacemarket.card;



import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.autoplacemarket.picture.Picture;
import project.autoplacemarket.user.User;

import java.util.*;


@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    private String image;
    private String title;
    @Column(length = 1000)
    private String resume;

    private int price;
    private int kilometer;
    private int door;
    private String transmission;
    private String fuel;
    private int year;



    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("card")
    private Set<Picture> picturesList = new HashSet<>();


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
