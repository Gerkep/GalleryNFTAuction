package com.victorgallery.Auction.repo;

import java.util.Optional;

import org.springframework.data.repository.Repository;

import com.victorgallery.Auction.model.Artwork;

public interface ArtworkRepository extends Repository<Artwork, Long> {

    <S extends Artwork> S save(S var1);

    <S extends Artwork> Iterable<S> saveAll(Iterable<S> var1);

    Optional<Artwork> findById(Long var1);

    boolean existsById(Long var1);

    Iterable<Artwork> findAll();

    Iterable<Artwork> findAllById(Iterable<Long> var1);

    long count();

    void deleteById(Long var1);

    void delete(Artwork var1);

    void deleteAll(Iterable<? extends Artwork> var1);

    void deleteAll();
}