package project.autoplacemarket.receivedMessage;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
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

            User senderUser = userRepository.findById(senderUserId)
                    .orElseThrow(() -> new RuntimeException("Selected user not found"));

            User selectedUser = userRepository.findById(selectedUserId)
                    .orElseThrow(() -> new RuntimeException("Selected user not found"));

            receivedMessage.setUser(senderUser);
            receivedMessage.setReceiver(selectedUser);

            return receivedMessageService.addAdminReceivedMessage(receivedMessage);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteReceivedMessage(@PathVariable("id") Long id) {
        receivedMessageService.deleteReceivedMessage(id);
    }

}
