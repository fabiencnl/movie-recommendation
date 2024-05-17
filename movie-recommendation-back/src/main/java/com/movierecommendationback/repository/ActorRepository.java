package com.movierecommendationback.repository;

import com.movierecommendationback.domain.Actor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ActorRepository extends JpaRepository<Actor, UUID> {
}
