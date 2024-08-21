import React,{useState, useEffect} from 'react';
import axios from 'axios'
import { Alert } from 'react-bootstrap';

export default function PurchaseForm()
{   const [productId, setProductId] = useState("")
    const [rolesId, setRolesId] = useState("")
    const [productName, setProductName] = useState("")
    //const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    const [purchaseQty, setPurchaseQty] = useState("")
    const [totalCost, setTotalCost] = useState("")

    const [quantityErr, setQuantityError] = useState(true)
    const [bValue, setBValue] =useState(true)
    //const navigate = useNavigate("")
    const [status,setStatus]=useState("")
   
    function calculateTotal(e)
    {
        let qty = e.target.value;

        setPurchaseQty(qty);
        let amt = Number(qty) * Number(price);

        setTotalCost( amt )
        if( !(qty) || !(qty.match(/^[0-9]*$/)))
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
    

    const handlePurchase=(e)=>
    {
          axios.post('http://example.backend.com/api/v2/purchase/save/'+rolesId+'/'+productId,
          {
              purchaseQty: purchaseQty,
              purchaseDate: new Date(),
              totalCost : totalCost,
              }).then(res=>{
                setStatus(res.data)
              });
      }             
    

    useEffect(() => {
        setProductId(localStorage.getItem("productId"))
        setProductName(localStorage.getItem("productName"))
       // setDescription(localStorage.getItem("description"))
        setPrice(localStorage.getItem("price"))
        setRolesId(localStorage.getItem("userId"))
    }, [])


    return(
       

            <>
                    <div class="title">
                               <div className='a'>           
                            <h1 className='hi' >Em Product Store</h1>

                            </div>
                            </div>


                            <div className=''>
           <a href="/home"><button type="submit" class="btn btn-primary">Go Back</button></a>
            
            
                   
                        
                    <div class="cw">
                    {status.length > 0 && (<Alert variant='success'>{status}</Alert>)}
                    
                    
            
                    <center>    <div class="txt">
<label class="form-title"><b>Product Name: </b></label>
<input class="form-control" placeholder = "product Name" value={productName} onChange={(e)=>setProductName(e.target.value)} disabled />
<br/>
<label><b>Price: </b></label>
<input class="form-control" placeholder = "Price" value={price} onChange={(e)=>setPrice(e.target.value)} disabled />
<br/>
<label><b>Purchase Quantity: </b></label>
<input class="form-control" placeholder = "Purchase Quantity" value={purchaseQty} onChange={calculateTotal} />
{quantityErr?<span id='err'>Please enter a valid positive value for quantity</span>:""}
<br/>
<br /><label><b>Total Cost: </b></label>
<input class="form-control" placeholder = "Total Amount" value={totalCost} onChange={(e)=>setTotalCost(e.target.value)} disabled/>

<br />
<button onClick={handlePurchase} class="btn btn-primary" disabled={bValue}>Place Your Order</button>
</div></center>
                       </div>
                       </div>
                      
                       
                       </>
                       )
}