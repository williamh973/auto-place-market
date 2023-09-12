package poecbdx23.livecodingjwt.message;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import poecbdx23.livecodingjwt.message.Message;
import poecbdx23.livecodingjwt.message.MessageService;
import poecbdx23.livecodingjwt.user.User;
import poecbdx23.livecodingjwt.user.UserRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

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

//    @PostMapping("/add")
//    public Message addMessage(@RequestBody Message message, @RequestParam(name = "receiver") Long receiverId) {
//        Optional<User> receiverOptional = userRepository.findById(receiverId);
//
//        if (receiverOptional.isPresent()) {
//            User receiver = receiverOptional.get();
//            message.setReceiver(receiver);
//            message.setTimestamp(new Date());
//
//            System.out.println("Message créé avec succès");
//            return messageService.addMessage(message, receiverId);
//        } else {
//            System.out.println("Utilisateur destinataire non trouvé");
//            throw new EntityNotFoundException("Utilisateur destinataire non trouvé avec l'ID : " + receiverId);
//        }
//    }

    @PutMapping("/update/{id}")
    public Message updateMessage(@RequestBody Message message, @PathVariable("id") Long id) {
        return messageService.updateMessage(message, id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMessage(@PathVariable("id") Long id) {
        messageService.deleteMessage(id);
    }

}
