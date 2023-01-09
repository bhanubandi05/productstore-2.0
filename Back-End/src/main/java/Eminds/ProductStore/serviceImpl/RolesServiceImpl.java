package Eminds.ProductStore.serviceImpl;

import Eminds.ProductStore.dto.RolesDto;
import Eminds.ProductStore.entity.Roles;
import Eminds.ProductStore.repository.RolesRepository;
import Eminds.ProductStore.service.RolesService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolesServiceImpl implements RolesService {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private RolesRepository rolesRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<?> saveRoles(RolesDto rolesDto) {
        rolesDto.setPassword(passwordEncoder.encode(rolesDto.getPassword()));
        Roles roles = modelMapper.map(rolesDto, Roles.class);
        Roles savedRoles = rolesRepository.save(roles);
        modelMapper.map(savedRoles, RolesDto.class);
        return new ResponseEntity<>("User Created Successfully", HttpStatus.CREATED);
    }

    @Override
    public List<Roles> getRoles() {
        return rolesRepository.findAll();
    }
}
