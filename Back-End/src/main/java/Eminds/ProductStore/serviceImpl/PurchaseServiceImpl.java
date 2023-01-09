package Eminds.ProductStore.serviceImpl;


import Eminds.ProductStore.dto.PurchaseDto;
import Eminds.ProductStore.entity.ProductStore;
import Eminds.ProductStore.entity.Purchase;
import Eminds.ProductStore.entity.Roles;
import Eminds.ProductStore.exception.ProductNotFound;
import Eminds.ProductStore.repository.ProductStoreRepository;
import Eminds.ProductStore.repository.PurchaseRepository;
import Eminds.ProductStore.repository.RolesRepository;
import Eminds.ProductStore.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;

@Service
public class PurchaseServiceImpl implements PurchaseService {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PurchaseRepository purchaseRepository;
    @Autowired
    private ProductStoreRepository productStoreRepository;
    @Autowired
    private RolesRepository rolesRepository;

    @Override
    public ResponseEntity<?> save(Long rolesId, Long productId, PurchaseDto purchaseDto) {
        ProductStore productStore =productStoreRepository.findById(
                productId).orElseThrow(()->new ProductNotFound(String.format("product Id %d not Found",productId)));

        Roles roles =rolesRepository.findById(
                rolesId).orElseThrow(()->new ProductNotFound(String.format("roles Id %d not Found",rolesId)));
        productStore.setQuantity(productStore.getQuantity()+ purchaseDto.getPurchaseQty());
        Purchase purchase = modelMapper.map(purchaseDto,Purchase.class);
        purchase.setProductStore(productStore);
        purchase.setRoles(roles);
        Purchase savedPurchase = purchaseRepository.save(purchase);
        modelMapper.map(savedPurchase, PurchaseDto.class);
        return  new ResponseEntity<>("Product Purchased successfully",HttpStatus.CREATED);

    }

    @Override
    public List<Purchase> getPurchase() {
        return purchaseRepository.findAll();
    }

}
