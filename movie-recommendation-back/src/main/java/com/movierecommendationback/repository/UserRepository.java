package com.movierecommendationback.repository;
import com.movierecommendationback.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}
