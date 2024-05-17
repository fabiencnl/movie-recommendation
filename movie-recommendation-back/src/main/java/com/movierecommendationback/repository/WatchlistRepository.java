package com.movierecommendationback.repository;

import com.movierecommendationback.domain.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface WatchlistRepository extends JpaRepository<Watchlist, UUID> {
}
