package poecbdx23.livecodingjwt.picture;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import poecbdx23.livecodingjwt.card.Card;
import poecbdx23.livecodingjwt.card.CardRepository;
import poecbdx23.livecodingjwt.user.User;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Observable;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class PictureService {


    private final PictureRepository pictureRepository;



    public Picture addPicture(Picture picture) {
        return pictureRepository.save(picture);
    }

    public List<Picture> getAllPictures() {
        return pictureRepository.findAll();
    }
    public List<Picture> getAll() {
        return pictureRepository.findAll();
    }

    public Picture getPictureById(Long id) {
        return pictureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(id + "not found"));
    }

    public Picture updatePicture(Picture picture, Long id) {

        Picture foundPicture = getPictureById(id);
        foundPicture.setSrc(picture.getSrc());


        return pictureRepository.save(foundPicture);

    }

    public void deletePicture(Long id) {
        pictureRepository.deleteById(id);
    }


}
