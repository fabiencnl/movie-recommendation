package com.movierecommendationback.service;

import com.movierecommendationback.domain.Actor;
import com.movierecommendationback.repository.ActorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ActorService {

    @Autowired
    private ActorRepository actorRepository;

    public Actor getActorDetails(UUID id) {
        return actorRepository.findById(id).orElse(null);
    }

    // Additional methods to save and fetch actor data
}
