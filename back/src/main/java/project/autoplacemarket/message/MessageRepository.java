package project.autoplacemarket.message;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.autoplacemarket.user.User;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllByOrderByTimestampDesc();
    List<Message> findByUser(User user);
    List<Message> findByUserRole(String role);
}
