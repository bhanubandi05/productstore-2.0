package Eminds.ProductStore.controller;

import Eminds.ProductStore.dto.ProductDto;
import Eminds.ProductStore.entity.ProductStore;
import Eminds.ProductStore.repository.ProductStoreRepository;
import Eminds.ProductStore.service.ProductStoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1")
public class ProductStoreController {

    @Autowired
    private ProductStoreService productStoreService;

    @Autowired
    private ProductStoreRepository productStoreRepository;

    @PostMapping("/save")
    public ResponseEntity<?> createProductStore(@RequestBody ProductDto productDto){
        try {

            productStoreService.createProduct(productDto);
            return new ResponseEntity<>("Product Stored Successfully", HttpStatus.CREATED);
        }
        catch(Exception e){
            return new ResponseEntity<>("Product already exists", HttpStatus.CREATED);
        }
    }
    @GetMapping("/productStore")
    public ResponseEntity<List<ProductStore>> getProductStore(){
        return ResponseEntity.ok(productStoreService.getProductStore());
    }

    @GetMapping("/productStore/{productId}")
    public ProductStore getProductStoreById(@PathVariable("productId") long productId){
        return productStoreService.getProductStoreByID(productId);
    }


    @DeleteMapping("/productStore/{productId}")
    public ResponseEntity<?> deleteProductStoreById(@PathVariable("productId") long productId){
        try {
            productStoreService.deleteProductStoreById(productId);
            return new ResponseEntity<>("Product Deleted Successfully", HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("A product details can't be deleted they are already in use", HttpStatus.CREATED);
        }
    }
    @PutMapping("/productStore/update/{productId}")
    public ResponseEntity<?>  update(@RequestBody ProductStore updateProduct, @PathVariable Long productId){
        productStoreRepository.findById(productId).map(productStore   -> {
            productStore.setProductName(updateProduct.getProductName());
            productStore.setDescription(updateProduct.getDescription());
            productStore.setQuantity(updateProduct.getQuantity());
            productStore.setPrice(updateProduct.getPrice());
          return productStoreRepository.save(productStore);
        });
        return new ResponseEntity<>("Update successfully",HttpStatus.CREATED);
    }



}
