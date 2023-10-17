package project.autoplacemarket.receivedMessage;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import project.autoplacemarket.user.User;
import project.autoplacemarket.user.UserRepository;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/receivedMessages")
@RequiredArgsConstructor
public class ReceivedMessageController {

    private final ReceivedMessageService receivedMessageService;
    private final UserRepository userRepository;

    @GetMapping("/all")
    public List<ReceivedMessage> getAllReceivedMessage() {
        return receivedMessageService.getAllReceivedMessage();
    }

    @GetMapping("/{id}")
    public ReceivedMessage getReceivedMessageById(@PathVariable("id") Long id) {
        return receivedMessageService.getReceivedMessageById(id);
    }


    @PostMapping("/admin/add")
    public ReceivedMessage addAdminReceivedMessage(
            @RequestBody ReceivedMessage receivedMessage,
            @RequestParam("senderUserId") Long senderUserId,
            @RequestParam("selectedUserId") Long selectedUserId,
            HttpServletRequest request) throws AccessDeniedException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"))) {

            User senderUser = userRepository.findById(selectedUserId)
                    .orElseThrow(() -> new RuntimeException("Selected user not found"));

            User selectedUser = userRepository.findById(selectedUserId)
                    .orElseThrow(() -> new RuntimeException("Selected user not found"));

            receivedMessage.setTimestamp(new Date());
            receivedMessage.setUser(selectedUser);

            return receivedMessageService.addAdminReceivedMessage(receivedMessage);
        } else {
            request.setAttribute("access_denied", "You do not have sufficient rights to access this resource");
            throw new AccessDeniedException("User does not have the correct rights to access this resource");
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteReceivedMessage(@PathVariable("id") Long id) {
        receivedMessageService.deleteReceivedMessage(id);
    }


}
