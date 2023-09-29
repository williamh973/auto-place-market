package project.autoplacemarket.picture;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/pictures")
@RequiredArgsConstructor
public class PictureController {

    private final PictureService pictureService;



    @GetMapping("/all")
    public List<Picture> getAll() {
        return pictureService.getAll();
    }


    @GetMapping("/{id}")
    public Picture getPictureById(@PathVariable("id") Long id) {
        return pictureService.getPictureById(id);
    }

    @PostMapping("/add")
    public Picture addPicture(@RequestBody Picture picture) {
    return pictureService.addPicture(picture);
    }



    @PutMapping("/update/{id}")
    public Picture updatePicture(@RequestBody Picture picture, @PathVariable("id") Long id) {
        return pictureService.updatePicture(picture, id);
    }

    @DeleteMapping("/delete/{id}")
    public void deletePicture(@PathVariable("id") Long id) {
        pictureService.deletePicture(id);
    }


}
