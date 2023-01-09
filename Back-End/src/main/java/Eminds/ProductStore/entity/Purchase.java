package Eminds.ProductStore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.Set;

@Data
@Entity
@Table(name = "purchase")
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "purchase_generator")
    @SequenceGenerator(name="purchase_generator", sequenceName = "purchase_seq", initialValue = 2001,allocationSize = 1)
    private Long purchaseId;

   @ManyToOne(fetch = FetchType.EAGER,optional = false)
   @JoinColumn(name="product_id",nullable=false)
   private ProductStore productStore;

    private Long purchaseQty;

    @ManyToOne(fetch = FetchType.EAGER,optional = false)
    @JoinColumn(name="roles_id",nullable=false)
    private Roles roles;

    private Date purchaseDate;

    private BigDecimal totalCost;

}

