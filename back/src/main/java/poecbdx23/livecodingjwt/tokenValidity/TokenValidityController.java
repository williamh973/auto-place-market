package poecbdx23.livecodingjwt.tokenValidity;

import jakarta.servlet.http.HttpServletRequest;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import poecbdx23.livecodingjwt.auth.AuthService;
import poecbdx23.livecodingjwt.util.JwtService;

@Getter
@Setter
@AllArgsConstructor
@RestController
@RequestMapping("/token")
public class TokenValidityController {

    private final JwtService jwtService;
    private final AuthService authService;




    @GetMapping("/check-token-validity")
    public ResponseEntity<?> checkTokenValidity(HttpServletRequest request) {
        String token = TokenValidityService.getTokenFromRequest(request);
        UserDetails userDetails = TokenValidityService.getCurrentUserDetails(request);

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        boolean isValid = jwtService.isTokenValid(token, userDetails);

        if (isValid) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
