package project.autoplacemarket.receivedMessage;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReceivedMessageService {
    private final ReceivedMessageRepository receivedMessageRepository;

    public List<ReceivedMessage> getAllReceivedMessage() {

        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        String role = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("");

        if (role.equals("ROLE_USER")) {
            return receivedMessageRepository.findByUserRole("ROLE_ADMIN");
        } else {
            return receivedMessageRepository.findByUserRole("ROLE_USER");
        }
    }

    public ReceivedMessage addAdminReceivedMessage(ReceivedMessage receivedMessage) {
        receivedMessage.setTimestamp(new Date());
        return receivedMessageRepository.save(receivedMessage);
    }

    public ReceivedMessage getReceivedMessageById(Long id) {
        return receivedMessageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(id + "not found"));
    }

    public void deleteReceivedMessage(Long id) {
        ReceivedMessage receivedMessage = receivedMessageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message user not found"));

        receivedMessageRepository.deleteById(id);
    }
}
