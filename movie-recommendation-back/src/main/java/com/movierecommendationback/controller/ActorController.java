package com.movierecommendationback.controller;

import com.movierecommendationback.domain.Actor;
import com.movierecommendationback.service.ActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/actors")
public class ActorController {

    @Autowired
    private ActorService actorService;

    @GetMapping("/{actorId}")
    public ResponseEntity<Actor> getActorDetails(@PathVariable UUID actorId) {
        Actor actor = actorService.getActorDetails(actorId);
        if (actor != null) {
            return ResponseEntity.ok(actor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
