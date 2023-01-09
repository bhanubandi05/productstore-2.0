package Eminds.ProductStore.security;

import Eminds.ProductStore.entity.Roles;
import Eminds.ProductStore.exception.UserNotFound;
import Eminds.ProductStore.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private RolesRepository rolesRepository;

    @Override
    public UserDetails loadUserByUsername(String emailId) throws UsernameNotFoundException {
        Roles roles = rolesRepository.findByEmailId(emailId).orElseThrow(
                ()-> new UserNotFound(String.format("User With emailId :%s is not found", emailId)));
        Set<String> userRoles = new HashSet<String>();
        userRoles.add("ROLE_ADMIN");
        return new User(roles.getEmailId(), roles.getPassword(), userAuthorities(userRoles));
    }

    private Collection<? extends GrantedAuthority> userAuthorities(Set<String> userRoles)
    {
        return  userRoles.stream().map(
                userRole -> new SimpleGrantedAuthority(userRole)
        ).collect(Collectors.toList());
    }

}
