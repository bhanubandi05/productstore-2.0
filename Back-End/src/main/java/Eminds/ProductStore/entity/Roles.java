package Eminds.ProductStore.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@Table(name = "Roles")
public class Roles {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "roles_generator")
    @SequenceGenerator(name="roles_generator", sequenceName = "roles_seq", initialValue = 3001,allocationSize = 1)
    @Column(name = "rolesId")
    private Long rolesId;

    @Column(name = "userName")
    private String userName;

    @Column(name = "emailId",unique=true)
    private String emailId;

    @Column(name = "password")
    private String password;

    @Column(name = "mobile")
    private Long mobile;

    @Column(name = "userType")
    private String userType;
    @OneToMany(mappedBy ="roles")
    @JsonIgnore
    private Set<Sales> sales;
    @OneToMany(mappedBy ="roles")
    @JsonIgnore
    private Set<Purchase>purchase ;
}
