package Eminds.ProductStore.repository;

import Eminds.ProductStore.entity.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleRepository extends JpaRepository<Sales,Long>{
}
