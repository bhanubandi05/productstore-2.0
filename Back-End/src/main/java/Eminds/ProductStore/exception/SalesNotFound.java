package Eminds.ProductStore.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class SalesNotFound extends RuntimeException{
    private  String message;
    public SalesNotFound(String message)
    {
        super(message);
        this.message=message;
    }
}
