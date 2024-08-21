import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap'


const RegisterForm =()=> {
      const[formValue, setFormValue] =useState({
       userName:'',
       emailId:'',
       mobile:'',
       password:'',
       confirmPassword:'',
       userType:''       
      });

      const [formError, setFormError] = useState({});
      const [status, setStatus] = useState('');
      const [isSubmit, setSubmit] = useState(false);
 
const handleValidation = (e) =>
{
   setFormValue({...formValue, [e.target.name]: e.target.value});   
}

const handleSubmit = (e) =>
{  e.preventDefault();
   setFormError(validateForm(formValue));
   setSubmit(true);   
}

const validateForm = (value) =>
{
   const errors= {};

   if(!value.userName) 
   {
      errors.userName = "Please Enter Valid Name";
   }
   else if( !(value.userName.match(/^[a-zA-Z ]*$/)) )
   {
      errors.userName = "User Name must containt alphabet characters only";
   }

   if(!value.mobile) 
   {
      errors.mobile = "Please Enter Valid Mobile Number";
   }
   else if( !(value.mobile.match(/^[0-9]{10}$/)) )
   {
      errors.mobile = "Mobile Number must contain 10 digits";
   }

   if(!value.password) 
   {
      errors.password = "Please Enter Valid Password";
   }
   else if(!value.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/))
   {
      errors.password = "Password must contain 8 characters length with capital letter and special symbol";
   }

   if(!value.confirmPassword) 
   {
      errors.confirmPassword = "Please Enter Confirm Password";
   }
   else if( (value.confirmPassword !== value.password) )
   {
      errors.confirmPassword = "Password and Confirm Password must be same";
   }
   if(!value.emailId) 
   {
      errors.emailId = "Please Enter Valid Emailid";
   }
   else if(!(value.emailId.match(/^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/)))
   {
      errors.emailId = "Email Id must contain @ and . special characters";
   }
   if(!value.userType) 
   {
      errors.userType = "Please Select User Type";
   }
   

   return errors;
}

useEffect(() =>
{
   if ( Object.keys(formError).length === 0 && isSubmit )
   {     
      axios.post("http://example.backend.com/roles/save",
            {
       userName: formValue.userName,
       emailId: formValue.emailId,
       mobile: formValue.mobile,
       password: formValue.password,
       userType: formValue.userType
               }).then(res =>{
     setStatus(res.data)
                     } );
                  }
},[formError])

return (
      <>
      <div class="body1">
        <div class='home'  style = {{color: 'white'}}>
            <h1>EMinds Product Store</h1>
            <p>The Best Online Product Store</p>
        </div>
        </div>
<nav class="navbar navbar-light bg-dark">
       <a class="navbar-brand" href="#" style={{color: 'white'}}>Registration Page</a>
       <div class="Button2">
           <a href="/"><button type="submit" class="btn btn-primary">Go Back</button></a>
        </div>
</nav>
    
<div class="background">
            <div class="AddNewProduct1">
            <center>  {status.length > 0 && (<Alert variant='success'>{status}</Alert>)} 
                  <div class="txt-reg">
      <form onSubmit={handleSubmit}>
        <label id="lbl-title"><b>Name:</b></label>
        <input type="text" id="txt-title" name="userName" value={formValue.userName} onChange={handleValidation}  /> 
        <span id='err'>{formError.userName}</span>
        <br/>


        <label id="lbl-title"><b>Email ID:</b></label> 
        <input type="text" id="txt-title" name="emailId" value={formValue.emailId} onChange={handleValidation}  /> 
        <span id='err'>{formError.emailId}</span>
        <br/>


        <label id="lbl-title"><b>Mobile No:</b></label> 
        <input type="text" id="txt-title" name="mobile" value={formValue.mobile}  onChange={handleValidation}   />
        <span id='err'>{formError.mobile}</span>
        <br/>


        <label id="lbl-title"><b>Password:</b></label> 
        <input type="password" id="txt-title" name="password" value={formValue.password} onChange={handleValidation} />
        <span id='err'>{formError.password}</span>
        <br/>

         
        <label id="lbl-title"><b>Confirm Password:</b></label> 
        <input type="password" id="txt-title" name="confirmPassword" value={formValue.confirmPassword} onChange={handleValidation} /> 
        <span id='err'>{formError.confirmPassword}</span>
        <br/>


		  <label id="lbl-title"><b>User Type:</b></label>        
        <select name="userType" id="txt-title" value={formValue.userType} onChange={handleValidation} >
            <option value="" ></option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>          
          </select>		<br/>
          <span id='err'>{formError.userType}</span><br/>
    
          <button id="txt-btn">Create</button> 
          </form>
        </div></center>
           </div>           
           </div>
</>
      );
 


}


export default RegisterForm;
