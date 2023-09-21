package poecbdx23.livecodingjwt.message;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import poecbdx23.livecodingjwt.user.User;
import poecbdx23.livecodingjwt.user.UserRepository;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;
    private final UserRepository userRepository;

    @GetMapping("/all")
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @GetMapping("/{id}")
    public Message getMessageById(@PathVariable("id") Long id) {
        return messageService.getMessageById(id);
    }


    @PostMapping("/add")
    public Message addMessage(@RequestBody Message message) {
        message.setTimestamp(new Date());
        return messageService.addMessage(message);
    }

    @PostMapping("/admin/add")
    public Message addAdminMessage(
            @RequestBody Message message,
            @RequestParam("userId")
            Long userId,
            HttpServletRequest request) throws AccessDeniedException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"))) {

            User selectedUser = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Selected user not found"));

            message.setTimestamp(new Date());
            message.setUser(selectedUser);

            return messageService.addAdminMessage(message);
        } else {
            request.setAttribute("access_denied", "You do not have sufficient rights to access this resource");
            throw new AccessDeniedException("User does not have the correct rights to access this resource");
        }
    }

    @PutMapping("/update/{id}")
    public Message updateMessage(@RequestBody Message message, @PathVariable("id") Long id) {
        return messageService.updateMessage(message, id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMessage(@PathVariable("id") Long id) {
        messageService.deleteMessage(id);
    }

}
