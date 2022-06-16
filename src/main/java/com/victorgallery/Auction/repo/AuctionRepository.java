package com.victorgallery.Auction.repo;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.victorgallery.Auction.model.Auction;


public interface AuctionRepository extends CrudRepository<Auction, Long> {

    void save(Optional<Auction> auction);

}