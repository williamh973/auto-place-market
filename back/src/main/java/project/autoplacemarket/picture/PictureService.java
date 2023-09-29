package project.autoplacemarket.picture;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@RequiredArgsConstructor
public class PictureService {


    private final PictureRepository pictureRepository;


    public List<Picture> getAll() {
        return pictureRepository.findAll();
    }

    public Picture getPictureById(Long id) {
        return pictureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(id + "not found"));
    }

public Picture addPicture(Picture picture) {
    return pictureRepository.save(picture);
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
