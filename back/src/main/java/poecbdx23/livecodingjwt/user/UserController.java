package poecbdx23.livecodingjwt.user;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


    @GetMapping("/firstname")
    public ResponseEntity<String> getUserFirstname() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user.getFirstname());
    }

    @GetMapping("/lastname")
    public ResponseEntity<String> getUserLastname() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user.getLastname());
    }



    @DeleteMapping("/delete/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long userId, HttpServletRequest request) throws AccessDeniedException {
        String role = SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString();

        if (role.equals("[ROLE_ADMIN]")) {
            userRepository.deleteById(userId);
        } else {
            request.setAttribute("access_denied", "You do not have sufficient rights to access this resource");
            throw new AccessDeniedException("User does not have the correct rights to access this resource");
        }
    }

}
