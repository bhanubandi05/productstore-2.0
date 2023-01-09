package Eminds.ProductStore.service;


import Eminds.ProductStore.dto.SalesDto;
import Eminds.ProductStore.entity.Sales;
import org.springframework.http.ResponseEntity;

import java.util.List;
public interface SaleService {
    public  ResponseEntity<?> saveSales(Long rolesId, Long productId, SalesDto salesDto);
    List<Sales> getSales();
}
