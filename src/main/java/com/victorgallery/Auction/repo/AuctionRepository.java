package com.victorgallery.Auction.repo;

import java.util.Optional;

import org.springframework.data.repository.Repository;

import com.victorgallery.Auction.model.Auction;


public interface AuctionRepository extends Repository<Auction, Long> {

    <S extends Auction> S save(S var1);

    <S extends Auction> Iterable<S> saveAll(Iterable<S> var1);

    Optional<Auction> findById(Long var1);

    boolean existsById(Long var1);

    Iterable<Auction> findAll();

    Iterable<Auction> findAllById(Iterable<Long> var1);

    long count();

    void deleteById(Long var1);

    void delete(Auction var1);

    void deleteAll(Iterable<? extends Auction> var1);

    void deleteAll();
}