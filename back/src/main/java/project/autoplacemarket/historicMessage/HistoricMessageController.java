package project.autoplacemarket.historicMessage;

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
@RequestMapping("/historicMessages")
@RequiredArgsConstructor
public class HistoricMessageController {

    private final HistoricMessageService historicMessageService;
    private final UserRepository userRepository;

    @GetMapping("/all")
    public List<HistoricMessage> getAllHistoricMessage() {
        return historicMessageService.getAllHistoricMessage();
    }

    @GetMapping("/{id}")
    public HistoricMessage getHistoricMessageById(@PathVariable("id") Long id) {
        return historicMessageService.getHistoricMessageById(id);
    }


    @PostMapping("/admin/add")
    public HistoricMessage addAdminHistoricMessage(
            @RequestBody HistoricMessage historicMessage,
            @RequestParam("selectedUserId") Long selectedUserId,
            HttpServletRequest request) throws AccessDeniedException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"))) {

            User selectedUser = userRepository.findById(selectedUserId)
                    .orElseThrow(() -> new RuntimeException("Selected user not found"));

            historicMessage.setTimestamp(new Date());
            historicMessage.setUser(selectedUser);

            return historicMessageService.addAdminHistoricMessage(historicMessage);
        } else {
            request.setAttribute("access_denied", "You do not have sufficient rights to access this resource");
            throw new AccessDeniedException("User does not have the correct rights to access this resource");
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteHistoricMessage(@PathVariable("id") Long id) {
        historicMessageService.deleteHistoricMessage(id);
    }

}
