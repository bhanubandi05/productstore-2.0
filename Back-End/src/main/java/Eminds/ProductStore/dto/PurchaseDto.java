package Eminds.ProductStore.dto;

import Eminds.ProductStore.entity.Roles;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Date;
@Setter
@Getter

public class PurchaseDto {
    private Long purchaseId;
    private Long purchaseQty;
    private Date purchaseDate;
    private BigDecimal totalCost;

}
