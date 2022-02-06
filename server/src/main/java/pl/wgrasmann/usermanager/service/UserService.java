package pl.wgrasmann.usermanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.wgrasmann.usermanager.exception.UserNotFoundException;
import pl.wgrasmann.usermanager.model.User;
import pl.wgrasmann.usermanager.repo.UserRepo;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class UserService {
    private final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User addUser(User user) {
        return userRepo.save(user);
    }

    public List<User> findAllUsers() {
        return userRepo.findAll();
    }

    public User uodateUser(User user) {
        return userRepo.save(user);
    }

    public User findUserById(Long id) throws Throwable {
        return userRepo.findUserById(id).orElseThrow(() ->
                new UserNotFoundException("User by id " + id + " was not found")
        );
    }

    public void deleteUser(Long id) {
        userRepo.deleteUserById(id);
    }
}
