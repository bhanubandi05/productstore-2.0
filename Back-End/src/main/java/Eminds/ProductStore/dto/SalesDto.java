package Eminds.ProductStore.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Date;
@Getter
@Setter
public class SalesDto {


    private Long salesId;

    private Long saleQty;


    private Date saleDate;

    private BigDecimal totalCost;
}