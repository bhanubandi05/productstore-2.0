package Eminds.ProductStore.controller;


import Eminds.ProductStore.dto.PurchaseDto;
import Eminds.ProductStore.dto.SalesDto;
import Eminds.ProductStore.entity.ProductStore;
import Eminds.ProductStore.entity.Sales;
import Eminds.ProductStore.repository.ProductStoreRepository;
import Eminds.ProductStore.repository.SaleRepository;
import Eminds.ProductStore.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://example.frontend.com/")
@RestController
@RequestMapping("/api/v3")

public class SaleController {
    @Autowired
    private SaleService saleService;
    @Autowired
    private SaleRepository saleRepository;
    @Autowired
    private ProductStoreRepository productStoreRepository;


    @PostMapping("/sales/Save/{rolesId}/{productId}")
    public ResponseEntity<?> saveSales(@PathVariable(name="rolesId")
                                          Long rolesId ,@PathVariable(name="productId")
                                          Long productId,@RequestBody SalesDto salesDto) {

        return saleService.saveSales(rolesId,productId, salesDto);

    }
    @GetMapping("/sales")
    public ResponseEntity<List<Sales>> getSales(){
        return ResponseEntity.ok(saleService.getSales());
    }
}
