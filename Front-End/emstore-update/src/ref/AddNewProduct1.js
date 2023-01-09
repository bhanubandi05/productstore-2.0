import React from 'react';
import axios from 'axios';


class AddNewProduct extends React.Component 
{
    constructor() {
      super();
      this.state = {
        fields: {},
        errors: {}
      }

      this.handleChange = this.handleChange.bind(this);
      this.submitAddNewProduct = this.submitAddNewProduct.bind(this); 
      

    };

    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });

    }
    

    submitAddNewProduct(e) 
    {
      
      e.preventDefault();
      if (this.validateForm()) 
      {
          let fields = {};
          fields["productName"] = "";
          fields["description"] = "";
          fields["price"] = "";
          this.setState({fields:fields});      
                
        try{
            axios.post("http://localhost:8080/api/v1/save",
            {
              productName: this.state.fields.productName,
                description: this.state.fields.description,
                quantity: "0",
                price: this.state.fields.price
            });
            
            alert("Product Details stored successfully")

        }
        catch(err)
        {
            alert("Product Details Failed to save");
        }
    }
          
}

    

    validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["productName"]) {
        formIsValid = false;
        errors["productName"] = "*Please enter ProductName.";
      }

      if (typeof fields["productName"] !== "undefined") {
        if (!fields["productName"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["productName"] = "*Please enter alphabet characters only.";
        }
      }
    
      if (!fields["description"]) {
        formIsValid = false;
        errors["description"] = "*Please enter Description.";
      }

      if (typeof fields["description"] !== "undefined") {
        if (!fields["description"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["description"] = "*Please enter alphabet characters only.";
        }
      }
    

      if (!fields["price"]) {
        formIsValid = false;
        errors["price"] = "*Please enter Price";
      }

      if (typeof fields["price"] !== "undefined") {
        if (!fields["price"].match(/^[0-9]*$/)) {
            formIsValid = false;
            errors["price"] = "*Please enter valid positive number for Price.";
          }
      }      

      this.setState({
        errors: errors
      });
      return formIsValid;


    }



  render() {
    return (   
      
      <>
         <div class="body1">
        <div class='home'  style = {{color: 'white'}}>
            <h1>EMinds Product Store</h1>
            <p>The Best Product Store</p>
        </div>
        </div>
                            <nav class="navbar navbar-light bg-dark">
                                   <a class="navbar-brand" href="#" style={{color: 'white'}}>ProductStore</a>
                            </nav>

            
              <div class="background">
                    <div class="card1">
                    <nav class="navbar navbar-light bg-dark">
                                <h3 style={{color: 'white'}}>Add New Product</h3>
                                <a href="/home"><button type="submit" class="btn btn-primary">Go Back</button></a>
                                </nav><br />
                           <center>
                           <div class="txt">
                        <form method="post"  name="AddNewProduct"  onSubmit= {this.submitAddNewProduct}>
                            <div class="row">

                                <div >
                                     <input type="text" class="form-control" placeholder="Product Name" name="productName" value={this.state.fields.productName} onChange={this.handleChange} />
                                </div>
                                
                                <div className="errorMsg">{this.state.errors.productName}</div>

                                <div >
                                     <input type="text" class="form-control" placeholder="Description" name="description" value={this.state.fields.description} onChange={this.handleChange}/>
                                </div>
                                
                                <div className="errorMsg">{this.state.errors.description}</div>

                                <div > 
                                     <input type="text" class="form-control" placeholder="Price" name="price" value={this.state.fields.price} onChange={this.handleChange} />
                                </div>
                                
                                <div className="errorMsg">{this.state.errors.price}</div>

                                <center>
                                    <div class="Button1">
                                       <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                   
                                </center>                              

                            </div>
                        </form>
                                                                  
                        </div></center>
                            
                    </div>
                    </div>
            
            </>
        
            );
        
        }
      
      
    }
      
      
      export default AddNewProduct;