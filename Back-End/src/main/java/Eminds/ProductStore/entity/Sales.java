package Eminds.ProductStore.entity;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;
@Data
@Entity
@Table(name = "sales")
public class Sales {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sales_generator")
    @SequenceGenerator(name="sales_generator", sequenceName = "sales_seq", initialValue = 4001,allocationSize = 1)
    private Long salesId;

    private Long saleQty;


    private Date saleDate;

    private BigDecimal totalCost;

    @ManyToOne(fetch = FetchType.EAGER,optional = false)
    @JoinColumn(name ="product_Id",nullable = false)
    private ProductStore productStore;

    @ManyToOne(fetch = FetchType.EAGER,optional = false)
    @JoinColumn(name ="roles_Id",nullable = false)
    private Roles roles;
}
