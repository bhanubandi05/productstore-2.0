package Eminds.ProductStore.serviceImpl;

import Eminds.ProductStore.dto.ProductDto;
import Eminds.ProductStore.entity.ProductStore;
import Eminds.ProductStore.service.ProductStoreService;
import Eminds.ProductStore.repository.ProductStoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductStoreServiceImpl implements ProductStoreService {


    @Autowired
    private ProductStoreRepository productStoreRepository;

    @Override
    public ProductDto createProduct(ProductDto productDto) {
        ProductStore productStore = productDtoToEntity(productDto);
        ProductStore savedProduct = productStoreRepository.save(productStore);
        return entityToProductDto(savedProduct);


    }


    public ProductStore productDtoToEntity(ProductDto productDto){
        ProductStore productStore =new ProductStore();
       productStore.setProductName(productDto.getProductName());
        productStore.setQuantity(productDto.getQuantity());
        productStore.setPrice(productDto.getPrice());
        productStore.setDescription(productDto.getDescription());
        return productStore;
    }

    public ProductDto entityToProductDto(ProductStore savedProduct){
        ProductDto productDto = new ProductDto();
        productDto.setProductId(savedProduct.getProductId());
        productDto.setProductName(savedProduct.getProductName());
        productDto.setDescription(savedProduct.getDescription());
        productDto.setQuantity(savedProduct.getQuantity());
        productDto.setPrice(savedProduct.getPrice());
        return productDto;

    }
    @Override
    public List<ProductStore> getProductStore() {
        return productStoreRepository.findAll();
    }
    @Override
    public void deleteProductStoreById(long productId) {
        productStoreRepository.deleteById(productId);
    }

    @Override
    public ProductStore getProductStoreByID(Long id) {
        Optional<ProductStore> bs = productStoreRepository.findById(id);
        return bs.get();
    }



}
