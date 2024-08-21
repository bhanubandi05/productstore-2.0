import React,{useState, useEffect} from 'react';
import axios from 'axios'
//import { useNavigate } from 'react-router-dom';
import{Alert} from 'react-bootstrap'

export default function SalesForm()
{   const [productId, setProductId] = useState("")
    const [rolesId, setRolesId] = useState("")
    const [productName, setproductName] = useState("")
    const [description, setDescription] = useState("")   
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")

    const [saleQty, setSaleQty] = useState("")
    const [totalCost, setTotalCost] = useState("")

    const [quantityErr,setQuantityError]= useState(true)
    const [bValue, setBValue]= useState(true)
    const [status,setStatus]=useState("")
    //const navigate = useNavigate("")
   
   function calculateTotal(e)
   {
    let qty = e.target.value;
    setSaleQty(qty);
    let amt = Number(qty) * Number(price);
    setTotalCost(amt)

    if ( !(qty) || !(qty.match(/^[0-9]*$/)) )
    {
      setQuantityError(true);
      setBValue(true);
    }
    else
    {
      setQuantityError(false);
      setBValue(false);
    }
   }
    
    const handleSale=(e)=>
    {
      if(Number(saleQty) > Number(quantity))
      {
        alert("Available Quantity is less than wanted Quantity, Books will not be sold");
        setBValue(true);
      }
      else
      {
           axios.post('http://example.backend.com/api/v3/sales/Save/'+rolesId+'/'+productId,
          {
            
              saleQty: saleQty,
              saleDate: new Date(),
              totalCost : totalCost,
              
              
          }    ).then(res =>{
            setStatus(res.data)
           })
           e.preventDefault();
        }
  
      }             
    

    useEffect(() => {
        setProductId(localStorage.getItem("productId"))
        setproductName(localStorage.getItem("productName"))
        setDescription(localStorage.getItem("description"))
        setPrice(localStorage.getItem("price"))
        setQuantity(localStorage.getItem("quantity"))
        setRolesId(localStorage.getItem("userId"))
    }, [])


    return(
                          
                <>          
                          
                          <div class="title">
                               <div className='a'>           
                            <h1 className='hi' >Em Product Store</h1>
                            </div>
                            </div>
                        
                                   <div class="but">
                                       <a href="/besales"><button type="submit" class="btn btn-primary">Go Back</button></a>
                                    </div>
                            

                            
        <div class="background">
        {status.length > 0 && (<Alert variant='success'>{status}</Alert>)}
        <div class="AddNewProduct">
        <br/>
                              <center>  <div class="txt">
            <label class="form-title"><b>Product Name: </b></label>
            <input class="form-control" placeholder = "Product Name" value={productName} onChange={(e)=>setproductName(e.target.value)} disabled />
            <label><b>Price: </b></label>
            <input class="form-control" placeholder = "Price" value={price} onChange={(e)=>setPrice(e.target.value)} disabled />
            <label><b>Sale Quantity: </b></label>
            <input class="form-control" placeholder = "Sale Quantity" value={saleQty} onChange={calculateTotal} />
            {quantityErr?<span id='err'>Please enter a valid positive value for Quantity</span>:""}
            <br />
            <label><b>Total Cost: </b></label>
            <input class="form-control" placeholder = "Total Amount" value={totalCost} onChange={(e)=>setTotalCost(e.target.value)} disabled /><br/>

            <center>
            <button onClick={handleSale} class="btn btn-primary" disabled={bValue}>Place Your Order</button>
            </center>    </div></center>
           </div>
           </div>
           
           </>
           )
    
}