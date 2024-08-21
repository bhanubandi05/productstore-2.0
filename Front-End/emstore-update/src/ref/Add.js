import React,{useState, useEffect} from 'react';
import axios from 'axios'
import { Alert } from 'react-bootstrap'

const AddProduct= ()  =>
{
    const [formValue, setFormValue] =useState(
        {
            productName:'',
            description:'',
            price:''
        }
    );
    const [formError, setFormError] =useState({});
    const [isSubmit, setSubmit] = useState(false);
    
    const [status, setStatus] = useState("")
    
    const handleValidation =(e) =>
    {
        setFormValue({...formValue, [e.target.name]:e.target.value})   
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        setFormError(validateForm(formValue));
        setSubmit(true);
    }

    const validateForm = (value) =>
    {   const errors = {};
        if(!value.productName)
        {   errors.productName = "Please Enter Valid product Name";
        }
        else if(!(value.productName.match( /^[a-zA-Z]+[a-zA-Z0-9]*$/)))
        {   errors.productName = "Please Enter Alphabet Characters and then numbers if any for product Name";
        }

        if(!value.description)
        {   errors.description = "Please Enter Valid description Name";            
        }
        else if(!(value.description.match(/^[a-zA-Z ]*$/)))
        {   errors.description = "Please Enter Alphabet Characters for description";
        }
        if(!value.price)
        {   errors.price = "Please Enter Valid Price Value";            
        }
        else if(!(value.price.match(/^[0-9]*$/)))
        {   errors.price = "Please Enter Positive Digits Only for Price Value";  
        }
        return errors;
    }

    
    useEffect( () =>
    {
        if ( Object.keys(formError).length === 0 && isSubmit )
        {
            axios.post('http://example.backend.com/api/v1/save',
            {
                productName:formValue.productName,
                description:formValue.description,
                price:formValue.price
            })
            .then(res => {
            setStatus(res.data)
              })      
        } 
    }, [formError])


    return(
        <>
<div class="body1">
        <div class='home'  style = {{color: 'white'}}>
            <h1>EMinds Product Store</h1>
            <p>The Best Online product Store</p>
        </div>
        </div>
<nav class="navbar navbar-light bg-dark">
       <a class="navbar-brand" href="#" style={{color: 'white'}}>Add New product</a>
       <div class="Button2">
           <a href="/home"><button type="submit" class="btn btn-primary">Go Back</button></a>
        </div>
</nav>


        <div class="background">
            <div class="AddNewProduct">
        <div class="AddNew">
            <center> {status.length > 0 && (<Alert variant='success'>{status}</Alert>)} 
              <div class="txt-addproduct">

            <form  onSubmit={handleSubmit}>
            <label id="lbl-title"><b>Product Name: </b></label>
            <input type="text" id="txt-title"  name='productName' value={formValue.productName} onChange={handleValidation} />
            <span id='err'>{formError.productName}</span>
            <br />

            <label id ="lbl-title"><b>Description: </b></label>
            <input type="text" id="txt-title" name="description" value={formValue.description} onChange={handleValidation}  />
            <span id='err'>{formError.description}</span>
            <br />
            <label id ="lbl-title"><b>Price: </b></label>
            <input type="text" id="txt-title" name = "price" value={formValue.price} onChange={handleValidation} />
            <span id='err'>{formError.price}</span>
            <br /><br />  
            <button id="txt-btn">Save</button>     
            
            </form>
            </div></center>
           </div>  
           </div>         
           </div>
           </>
           )    
} 

export default AddProduct;