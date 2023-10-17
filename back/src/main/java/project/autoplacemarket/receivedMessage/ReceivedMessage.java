package project.autoplacemarket.receivedMessage;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.autoplacemarket.user.User;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReceivedMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000)
    private String resume;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;


    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "receiver_id", referencedColumnName = "id")
    @JsonIgnoreProperties(
            {
                    "messagesList",
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
