package com.victorgallery.Auction.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.victorgallery.Auction.model.Artwork;
import com.victorgallery.Auction.repo.ArtworkRepository;

@RestController
@RequestMapping("/api")
public class ArtworkController {
    
    @Autowired
    private ArtworkRepository repository;

    ArtworkController(ArtworkRepository repository){
        this.repository = repository;
    }

    @CrossOrigin
    @PostMapping(path = "/artwork/add", consumes = { MediaType.APPLICATION_JSON_VALUE })
    public Long addArtwork(@RequestBody Artwork artwork) {
        Artwork newArtwork = repository.save(artwork);

        return newArtwork.getId();
    }

    @CrossOrigin
    @GetMapping(path = "/artwork/list", produces = { MediaType.APPLICATION_JSON_VALUE })
    List<Artwork> all() {
        return (List<Artwork>) repository.findAll();
    }

    @CrossOrigin
    @GetMapping("/artwork/{id}")
    Optional<Artwork> one(@PathVariable Long id) {

        return repository.findById(id);
    }

    @CrossOrigin
    @DeleteMapping("/artwork/{id}/delete")
    void deleteArtwork(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
