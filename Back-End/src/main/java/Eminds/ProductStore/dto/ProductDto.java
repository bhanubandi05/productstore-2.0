package Eminds.ProductStore.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductDto {
    private Long productId;
    private String productName;
    private String description;
    private Long quantity;
    private BigDecimal price;
}
