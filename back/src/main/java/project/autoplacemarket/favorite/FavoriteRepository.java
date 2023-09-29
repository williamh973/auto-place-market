package project.autoplacemarket.favorite;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.autoplacemarket.card.Card;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUserEmail(String email);


    void deleteByCard(@Param("card") Card card);
}