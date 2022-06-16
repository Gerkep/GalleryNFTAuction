package com.victorgallery.Auction.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.victorgallery.Auction.model.Auction;
import com.victorgallery.Auction.repo.AuctionRepository;

@RestController
@RequestMapping("/api")
public class AuctionController {
    
    @Autowired
    private AuctionRepository repository;

    AuctionController(AuctionRepository repository){
        this.repository = repository;
    }

    @CrossOrigin
    @PostMapping(path = "/auction/add", consumes = { MediaType.APPLICATION_JSON_VALUE })
    public void addAuction(@RequestBody Auction auction) {
        repository.save(auction);
    }

    @CrossOrigin
    @GetMapping(path = "/auction/list", produces = { MediaType.APPLICATION_JSON_VALUE })
    List<Auction> all() {
        return (List<Auction>) repository.findAll();
    }


    @CrossOrigin
    @DeleteMapping("auction/delete")
    void deleteAuction() {
        repository.deleteAll();
    }
}
