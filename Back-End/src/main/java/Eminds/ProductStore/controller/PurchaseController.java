package Eminds.ProductStore.controller;


import Eminds.ProductStore.dto.PurchaseDto;
import Eminds.ProductStore.entity.Purchase;
import Eminds.ProductStore.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v2")
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @PostMapping("/purchase/save/{rolesId}/{productId}")
    public ResponseEntity<?> savePurchase(@PathVariable(name="rolesId")
                                              Long rolesId ,@PathVariable(name="productId")
    Long productId,@RequestBody PurchaseDto purchaseDto) {

        return purchaseService.save(rolesId,productId, purchaseDto);

    }
    @GetMapping("/purchase")
    public ResponseEntity<List<Purchase>> getPurchase(){
        return ResponseEntity.ok(purchaseService.getPurchase());
    }
}
