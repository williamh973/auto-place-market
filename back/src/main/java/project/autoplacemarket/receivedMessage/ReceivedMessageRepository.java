package project.autoplacemarket.receivedMessage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.autoplacemarket.user.User;

import java.util.List;

@Repository
public interface ReceivedMessageRepository extends JpaRepository<ReceivedMessage, Long> {
    List<ReceivedMessage> findAllByOrderByTimestampDesc();
    List<ReceivedMessage> findByUser(User user);
    List<ReceivedMessage> findByUserRole(String role);
}
