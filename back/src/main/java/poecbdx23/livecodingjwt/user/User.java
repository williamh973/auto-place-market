package poecbdx23.livecodingjwt.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
//import poecbdx23.livecodingjwt.user.CustomAuthority;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import poecbdx23.livecodingjwt.card.Card;


import java.util.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
//@JsonDeserialize(using = UserDeserializer.class)
@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    @JsonIgnore
    private String password;

    private String role;



    @OneToMany(mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnoreProperties("user")
    private Set<Card> cardList = new HashSet<>();



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }

//    @Transient
//    private Set<CustomAuthority> authorities = new HashSet<>();
//
//    public Set<CustomAuthority> getAuthorities() {
//        return authorities;
//    }
//
//    public void setAuthorities(Set<CustomAuthority> authorities) {
//        this.authorities = authorities;
//    }


    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}