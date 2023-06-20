package com.example.demo.bind;

import com.example.demo.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bind")
@RequiredArgsConstructor
public class UserCardController {

    private final UserCardService service;

    @GetMapping("/userId={userId}/cardId={cardId}")
    public User bindUserWidthCard(@PathVariable("userId") Long userId, @PathVariable("cardId") Long cardId) {
        return service.bindUserWidthCard(userId,cardId);
    }
}
