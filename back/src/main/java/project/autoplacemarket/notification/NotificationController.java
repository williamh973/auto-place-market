package project.autoplacemarket.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;
import project.autoplacemarket.user.User;
import project.autoplacemarket.user.UserRepository;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;
    private final UserRepository userRepository;

    @GetMapping("/all")
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/{id}")
    public Notification getNotificationById(@PathVariable("id") Long id) {
        return notificationService.getNotificationById(id);
    }

    @PostMapping("/add")
    public Notification addAdminNotification(
            @RequestBody Notification notification,
            @RequestParam("userId") Long userId
    )
            throws AccessDeniedException {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("user not found"));

        notification.setUser(user);
        return notificationService.addAdminNotification(notification);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteNotification(@PathVariable("id") Long id) {
        notificationService.deleteNotification(id);
    }
}
