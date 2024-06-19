package project.autoplacemarket.historicMessage;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import java.util.Collection;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HistoricMessageService {

    private final HistoricMessageRepository historicMessageRepository;

    public List<HistoricMessage> getAllHistoricMessage() {

        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        String role = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("");

        if (role.equals("ROLE_USER")) {
            return historicMessageRepository.findByUserRole("ROLE_ADMIN");
        } else {
            return historicMessageRepository.findByUserRole("ROLE_USER");
        }
    }

    public HistoricMessage addAdminHistoricMessage(HistoricMessage historicMessage) {
        historicMessage.setTimestamp(new Date());
        return historicMessageRepository.save(historicMessage);
    }

    public HistoricMessage getHistoricMessageById(Long id) {
        return historicMessageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(id + "not found"));
    }

    public void deleteHistoricMessage(Long id) {
        HistoricMessage historicMessage = historicMessageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message user not found"));

        historicMessageRepository.deleteById(id);
    }

}
