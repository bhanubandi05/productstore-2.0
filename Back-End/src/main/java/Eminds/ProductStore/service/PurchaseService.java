package Eminds.ProductStore.service;


import Eminds.ProductStore.dto.PurchaseDto;
import Eminds.ProductStore.entity.Purchase;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PurchaseService {
   public  ResponseEntity<?> save(Long rolesId, Long productId, PurchaseDto purchaseDto);

    List<Purchase> getPurchase();
}
