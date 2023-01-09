package Eminds.ProductStore.service;

import Eminds.ProductStore.dto.RolesDto;
import Eminds.ProductStore.entity.Roles;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RolesService {

    public ResponseEntity<?> saveRoles(RolesDto rolesDto);
    List<Roles> getRoles(); // get the list of sales
    
}
