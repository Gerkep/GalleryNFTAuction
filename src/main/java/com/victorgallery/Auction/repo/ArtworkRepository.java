package com.victorgallery.Auction.repo;

import org.springframework.data.repository.CrudRepository;

import com.victorgallery.Auction.model.Artwork;

public interface ArtworkRepository extends CrudRepository<Artwork, Long> {

}