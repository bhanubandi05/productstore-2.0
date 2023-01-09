import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {get} from '../components/service/RoleService';
const Roles = () => {

     const [roles, setRoles] = useState([])
     const [userName, setUserName] = useState("")
     const [password, setPassword] = useState("")
     const navigate = useNavigate();

    
    const getRoles = () => 
    {
        get("/view")
            .then(res => {
                console.log(res.data)
                setRoles(res.data)
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {

        getRoles() // called the method each time when the page is loaded

    }, [])

    const handleUpdate=(e)=>
    {
       roles.map(p => {
        if((p.userName) === userName  && (p.password) === password)
        {
            let userid = p.rolesId
            let usertype = p.userType
            localStorage.setItem("userId",userid);
            console.log(userid);
            if(usertype === "Admin")
            {
                navigate('/home');
            }
            else if(usertype === "User")
            {
                navigate('/sales');
            }
            else
            {    
                navigate('/') ;
            }
        }
       })
    }

    return (
    <>
    <div class="body1">
        <div class='home'  style = {{color: 'white'}}>
        
            <h1>EMinds Product Store</h1>
            <p>The Best Product Store</p>
        </div>
        </div>

       
        <body background="https://previews.123rf.com/images/kotenko/kotenko1403/kotenko140300008/26854631-snowy-winter-in-a-mountain-forest-sunny-cold-day-with-snow-covered-trees-carpathian-mountains-ukrain.jpg"> 
            
   <div class="Login-Page" >
       <h1 id="head">Login Page</h1>
       <form onSubmit={handleUpdate}>
            <input id="log" placeholder = "User Name" value={userName}  onChange={(e)=>setUserName(e.target.value)} /><br/>
           <br />
            <input id="log" type="password" placeholder = "Password" value={password} onChange={(e)=>setPassword(e.target.value)} /><br/><br/>
         <center>   <button type= "submit" class="btn btn-primary">Login</button>
         <br/> <a href="/Registration"><p>Register</p></a></center>
        </form>

        </div>
        
        </body>
    </>
    
  );
}
          

export default Roles