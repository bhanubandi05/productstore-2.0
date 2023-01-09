package Eminds.ProductStore.serviceImpl;

import Eminds.ProductStore.dto.PurchaseDto;
import Eminds.ProductStore.dto.SalesDto;
import Eminds.ProductStore.entity.ProductStore;
import Eminds.ProductStore.entity.Purchase;
import Eminds.ProductStore.entity.Roles;
import Eminds.ProductStore.entity.Sales;
import Eminds.ProductStore.exception.ProductNotFound;
import Eminds.ProductStore.repository.ProductStoreRepository;
import Eminds.ProductStore.repository.RolesRepository;
import Eminds.ProductStore.repository.SaleRepository;
import Eminds.ProductStore.service.SaleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SaleServiceImpl implements SaleService {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    private ProductStoreRepository productStoreRepository;

    @Override
    public ResponseEntity<?> saveSales(Long rolesId, Long productId, SalesDto salesDto) {
        ProductStore productStore = productStoreRepository.findById(
                productId).orElseThrow(() -> new ProductNotFound(String.format("product Id %d not Found", productId)));

        Roles roles = rolesRepository.findById(
                rolesId).orElseThrow(() -> new ProductNotFound(String.format("roles Id %d not Found", rolesId)));
        if (productStore.getQuantity() >= salesDto.getSaleQty()&&salesDto.getSaleQty()>0) {
            productStore.setQuantity(productStore.getQuantity() - salesDto.getSaleQty());

        Sales sales = modelMapper.map(salesDto, Sales.class);
        sales.setProductStore(productStore);
        sales.setRoles(roles);
        Sales savedSales = saleRepository.save(sales);
        modelMapper.map(savedSales, SalesDto.class);
        return new ResponseEntity<>("Product Sold successfully", HttpStatus.CREATED);
    }
        else{
            return new ResponseEntity<>("Available Quantity is Less, Sales Not Done ", HttpStatus.CREATED);
        }

    }

    @Override
    public List<Sales> getSales() {
        return saleRepository.findAll();
    }
}
