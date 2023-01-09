package Eminds.ProductStore.service;

import Eminds.ProductStore.dto.ProductDto;
import Eminds.ProductStore.entity.ProductStore;

import java.util.List;

public interface ProductStoreService {
    public ProductDto createProduct(ProductDto productDto);



    List<ProductStore> getProductStore();

    void deleteProductStoreById(long productId);

    public ProductStore getProductStoreByID(Long id);

}
