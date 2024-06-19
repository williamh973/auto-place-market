package project.autoplacemarket.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.autoplacemarket.user.User;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findAllByOrderByTimestampDesc();
    List<Notification> findByUser(User user);
    List<Notification> findByUserRole(String role);
}
