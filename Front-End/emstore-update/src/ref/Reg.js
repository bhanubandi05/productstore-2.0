import React, { useState } from 'react';
import axios from 'axios';
import { Alert, } from 'react-bootstrap'




const RegisterForm =()=> {

      const [userName,setUserName] = useState("")
      const [emailId,setEmailId] = useState("")
      const [mobile,setMobile] = useState("")
      const [password,setPassword] = useState("")
      const [userType,setUserType] = useState("")
      const [status,setStatus] = useState("")
      

      const [userNameErr, setUserNameError] = useState(true)
      const [emailIdErr, setEmailIdError] = useState(true)
      const [mobileErr, setMobileError] = useState(true)
      const [passwordErr, setPasswordError] = useState(true)
  

   const submitUserRegistrationForm = (e) => { 
     
          if(validateForm()){         
                axios.post("http://example.backend.com/roles/save",
            {
                userName: userName,
                emailId: emailId,
                mobile: mobile,
                password: password,
			 userType: userType
            }).then(res =>{
              setStatus(res.data)
             } );e.preventDefault();
          }
    
}

    function validateForm(){
     if(userNameErr || emailIdErr || mobileErr || passwordErr)
            return false;
     else
            return true;
    }
    function handleUserName(e)
    {   
       let userName = e.target.value;            
       setUserName(userName);
       if( !(userName) || !(userName.match(/^[a-zA-Z ]*$/)) )
       {    setUserNameError(true); 
           
       }
       else
       {    setUserNameError(false); 
            
       }         
    }

    function handleEmailId(e)
    {   
       let emailId = e.target.value;            
       setEmailId(emailId);
       if( !(emailId) || !(emailId.match(/^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/)) )
       {    setEmailIdError(true); 
            
       }
       else
       {    setEmailIdError(false); 
            
       }         
    }

    function handleMobileNo(e)
    {   
       let mobile = e.target.value;            
       setMobile(mobile);
       if( !(mobile) || !(mobile.match(/^[0-9]{10}$/)) )
       {    setMobileError(true); 
            
       }
       else
       {    setMobileError(false); 
           
       }         
    }
  
    function handlePassword(e)
    {   
       let password = e.target.value;            
       setPassword(password);
       if( !(password) || !password.match(/^.*(?=.{8,})(?=.*\d)(?=.[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/) )
       {    setPasswordError(true); 
        
       }
       else
       {    setPasswordError(false); 
            
       }         
    }

  

    return (
      <>
      <div class="reg-background">
    <div class="reg-form-layout">
      <img src='images.jpg' id="reg-logo" />
    
     <div id="register">
     {status.length > 0 && (<Alert variant='success'>{status}</Alert>)}<br/>

        <h3 id="head">Create Account </h3> 
         
        <label  class="lab-tittle"><b>Name: &nbsp;&nbsp;</b></label>
        <input type="text" id="log" name="username" value={userName} onChange={handleUserName} />
        <br/>
        {userNameErr?<span style={{color: 'red'}} id="error-up">*User Name Must contain alphabet characters only</span>:""}
        <br/>
        <br/>
        <label class="lab-tittle"><b>Email ID:  &nbsp;&nbsp;</b></label>
        <input type="text" id="log" name="emailid" value={emailId} onChange={handleEmailId}  />
        <br/>
        {emailIdErr?<span style={{color: 'red'}} id="error-up">*Please enter valid email-ID</span>:""}
        <br/>
        <br/>
        <label class="lab-tittle"><b>Mobile No: &nbsp;</b></label>
        <input type="text" id="log" name="mobileno" value={mobile} onChange={handleMobileNo}   />
        <br/>
        {mobileErr?<span style={{color: 'red'}} id="error-up">*Please enter valid mobile no</span>:""}
        <br/>
        <br/>
        <label class="lab-tittle"><b>Password: &nbsp;&nbsp;</b></label>
        <input type="password" id="log" name="password" value={password} onChange={handlePassword} />
        
        <br/>
        {passwordErr?<span style={{color: 'red'}} id="error-up">*Please enter secure and strong password</span>:""}
        <br/>
        <br/>
         
		    <label class="lab-tittle"> <b> User Type: &nbsp;&nbsp;</b> </label>
           
          <select name="usertype" id="drop" value={userType} onChange={(e)=>setUserType(e.target.value)}>
            <option value=""></option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>          
          </select>		
          <br/>
          <br/>
          <center><button type="submit" id='reg-btn' class="btn btn-primary" onClick={submitUserRegistrationForm}>Create Account</button></center>
          
    
      </div>
      </div>
</div>

</>
      );
}

export default RegisterForm;