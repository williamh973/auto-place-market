package project.autoplacemarket.user;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import project.autoplacemarket.card.Card;
import project.autoplacemarket.message.Message;
import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email, HttpServletRequest request) throws AccessDeniedException {
        String username  = SecurityContextHolder.getContext().getAuthentication().getName();
        String role  = SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString();

        if (username.equals(email) || role.equals("[ROLE_ADMIN]")) {
            return ResponseEntity.ok(userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("email " + email +" not found"))
            );
        } else {
            request.setAttribute("access_denied", "You do not have suffisant rights to access to this resource");
            throw new AccessDeniedException("User does not have the correct rights to access to this resource");
        }

    }

    @GetMapping("/all")
    public List<User> getAll(HttpServletRequest request) throws AccessDeniedException {
        String role  = SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString();
        if(role.equals("[ROLE_ADMIN]")) {
            return userRepository.findAll();
        } else {
            request.setAttribute("access_denied", "You do not have suffisant rights to access to this resource");
            throw new AccessDeniedException("User does not have the correct rights to access to this resource");

        }
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("current/{id}")
    public ResponseEntity<Long> getUserId() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user.getId());
    }

    @GetMapping("current/data")
    public ResponseEntity<User> getUserCurrentData() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(user);
    }

    @GetMapping("current/cardList")
    public ResponseEntity<Set<Card>> getUserCards(Principal principal, HttpServletRequest request) throws AccessDeniedException {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Set<Card> cardList = user.getCardList();

        return ResponseEntity.ok(cardList);
    }

    @GetMapping("current/sentMessagesList")
    public ResponseEntity<Set<Message>> getUserMessages(Principal principal, HttpServletRequest request) throws AccessDeniedException {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Set<Message> historicMessageList = user.getHistoricMessagesList();

        return ResponseEntity.ok(historicMessageList);
    }

    @GetMapping("/disable/all")
    public ResponseEntity<List<User>> getAllUserDisable(HttpServletRequest request) throws AccessDeniedException {
        String role  = SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString();
        if(role.equals("[ROLE_ADMIN]")) {

            List<User> blockedUsers =  userRepository.findByBlocked(true);

            return ResponseEntity.ok(blockedUsers);
        } else {
            request.setAttribute("access_denied", "You do not have suffisant rights to access to this resource");
            throw new AccessDeniedException("User does not have the correct rights to access to this resource");
        }
    }

    @PutMapping("/disable/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> disableUser(@PathVariable Long userId, HttpServletRequest request) throws AccessDeniedException {
        String role = SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString();

        if (role.equals("[ROLE_ADMIN]")) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            user.setBlocked(true);
            userRepository.save(user);

            return ResponseEntity.noContent().build();
        } else {
            request.setAttribute("access_denied", "You do not have sufficient rights to access this resource");
            throw new AccessDeniedException("User does not have the correct rights to access this resource");
        }
    }

    @PutMapping("/enable/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> enabledUser(@PathVariable Long userId, HttpServletRequest request) throws AccessDeniedException {
        String role = SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString();

        if (role.equals("[ROLE_ADMIN]")) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            user.setBlocked(false);
            userRepository.save(user);

            return ResponseEntity.noContent().build();
        } else {
            request.setAttribute("access_denied", "You do not have sufficient rights to access this resource");
            throw new AccessDeniedException("User does not have the correct rights to access this resource");
        }
    }

    @PutMapping("/updateFirstname/{userId}")
    public ResponseEntity<Void> updateFirstname(@PathVariable Long userId, @RequestParam String newFirstname, HttpServletRequest request) throws AccessDeniedException {
        String role = SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString();

        if (role.equals("[ROLE_ADMIN]") || role.equals("[ROLE_USER]")) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            user.setFirstname(newFirstname);
            userRepository.save(user);

            return ResponseEntity.noContent().build();
        } else {
            request.setAttribute("access_denied", "You do not have sufficient rights to access this resource");
            throw new AccessDeniedException("User does not have the correct rights to access this resource");
        }
    }

    @PutMapping("/updateLastname/{userId}")
    public ResponseEntity<Void> updateLastname(@PathVariable Long userId, @RequestParam String newLastname, HttpServletRequest request) throws AccessDeniedException {
        String role = SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString();

        if (role.equals("[ROLE_ADMIN]") || role.equals("[ROLE_USER]")) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            user.setLastname(newLastname);

            userRepository.save(user);

            return ResponseEntity.noContent().build();
        } else {
            request.setAttribute("access_denied", "You do not have sufficient rights to access this resource");
            throw new AccessDeniedException("User does not have the correct rights to access this resource");
        }
    }

    @DeleteMapping("/delete/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserById(@PathVariable Long userId, HttpServletRequest request) throws AccessDeniedException {
        String role = SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString();

        if (role.equals("[ROLE_ADMIN]")) {
            userRepository.deleteById(userId);
        } else {
            request.setAttribute("access_denied", "You do not have sufficient rights to access this resource");
            throw new AccessDeniedException("User does not have the correct rights to access this resource");
        }
    }

    @DeleteMapping("current/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCurrentUser(HttpServletRequest request) throws AccessDeniedException {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepository.delete(user);
    }

}
