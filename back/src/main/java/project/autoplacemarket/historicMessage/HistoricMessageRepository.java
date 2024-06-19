package project.autoplacemarket.historicMessage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.autoplacemarket.user.User;

import java.util.List;

@Repository
public interface HistoricMessageRepository extends JpaRepository<HistoricMessage, Long> {
    List<HistoricMessage> findAllByOrderByTimestampDesc();
    List<HistoricMessage> findByUser(User user);
    List<HistoricMessage> findByUserRole(String role);

}
