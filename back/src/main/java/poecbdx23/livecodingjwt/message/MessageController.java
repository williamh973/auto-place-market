package poecbdx23.livecodingjwt.message;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;


    @GetMapping("/all")
    public List<Message> getAll() {
        return messageService.getAll();
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

    @PutMapping("/update/{id}")
    public Message updateMessage(@RequestBody Message message, @PathVariable("id") Long id) {
        return messageService.updateMessage(message, id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMessage(@PathVariable("id") Long id) {
        messageService.deleteMessage(id);
    }

}
