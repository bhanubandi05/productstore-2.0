package Eminds.ProductStore.controller;


import Eminds.ProductStore.dto.LoginDto;
import Eminds.ProductStore.dto.RolesDto;
import Eminds.ProductStore.entity.Roles;
import Eminds.ProductStore.repository.RolesRepository;
import Eminds.ProductStore.service.RolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://example.frontend.com/")
@RestController
@RequestMapping("/api/v5")
public class RolesController {

    @Autowired
    private RolesService rolesService;

    @Autowired
    private RolesRepository rolesRepository;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/save")
    public ResponseEntity<?> createRoles(@RequestBody RolesDto rolesDto) {
        try {
            rolesService.saveRoles(rolesDto);
            return new ResponseEntity<>("Registered Successfully", HttpStatus.CREATED);
        }
        catch(Exception e) {
            return new ResponseEntity<>("user with same EmailID Already exists", HttpStatus.CREATED);

        }

    }
    @GetMapping("/view")
    public ResponseEntity<List<Roles>> getRoles(){
        return ResponseEntity.ok(rolesService.getRoles());
    }



    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmailId(), loginDto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return new ResponseEntity<>("LoginSuccess", HttpStatus.OK);
    }
}
