package Eminds.ProductStore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Set;

@Data
@Entity
@Table(name = "ProductStore")
public class ProductStore {
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_generator")
    @SequenceGenerator(name="product_generator", sequenceName = "product_seq", initialValue = 101,allocationSize = 1)
    private Long productId;

    @Column(name = "productName", unique=true)
    private String productName;

    private String description;

    private Long quantity;

    private BigDecimal price;
    @OneToMany(mappedBy ="productStore")
    @JsonIgnore
    private Set<Sales> sales;
    @OneToMany(mappedBy ="productStore")
    @JsonIgnore
    private Set<Purchase>purchase ;

}
