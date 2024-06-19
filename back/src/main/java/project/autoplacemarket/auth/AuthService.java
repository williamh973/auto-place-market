package project.autoplacemarket.auth;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.autoplacemarket.user.User;
import project.autoplacemarket.user.UserRepository;
import project.autoplacemarket.util.JwtService;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public Map<String, String> register(RegisterRequest request, HttpServletRequest httpRequest) throws Exception {

        if (!repository.findByEmail(request.getEmail()).isPresent()) {
            var user = User.builder()
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(request.getRequiredRole())
                    .build();

            repository.save(user);

            Map<String, String> body = new HashMap<>();
            body.put("message", "Compte créé avec succès !");
            return body;

        } else {
            httpRequest.setAttribute("username_taken_exception", "Username already taken");
            throw new Exception("Username already taken");
        }

    }

    public AuthResponse authenticate(AuthRequest request, HttpServletRequest httpRequest) {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            User user = repository.findByEmail(request.getEmail()).orElseThrow();

            Map<String, Object> extraClaims = new HashMap<>();
            extraClaims.put("role", user.getRole().toString());

            String jwtToken = jwtService.generateToken(new HashMap<>(extraClaims), user);
            return AuthResponse.builder()
                    .token(jwtToken)
                    .message("Connexion réussie !")
                    .build();

        } catch (BadCredentialsException ex) {
            httpRequest.setAttribute("bad_credentials", ex.getMessage());
            throw new BadCredentialsException("Bad credentials");
        }

    }


}
