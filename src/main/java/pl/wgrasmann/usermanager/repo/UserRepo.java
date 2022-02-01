package pl.wgrasmann.usermanager.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.wgrasmann.usermanager.model.User;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    void deleteUserById(Long id);

    Optional<User> findUserById(Long id);
}
