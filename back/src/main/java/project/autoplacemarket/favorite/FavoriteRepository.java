package project.autoplacemarket.favorite;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.autoplacemarket.card.Card;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    void deleteByCard(@Param("card") Card card);
}