import React from 'react'
import { Tabs,Tab,Row,Col,Card } from 'react-bootstrap'
import {useState, useEffect} from 'react';
import axios from 'axios'
import './behome.css'

import { Container, Table, Alert, Button } from 'react-bootstrap'

import { get, remove } from '../service/ProductStoreService'
import { salesget } from '../service/SalesService'
import { roleget } from '../service/RoleService'
import { purchaseget } from '../service/PurchaseService'


                                                        
//-----------------------------------------------------------------------------------------------------------------------------------------------
//                                                 Add Prooduct 
//-----------------------------------------------------------------------------------------------------------------------------------------------


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
      const [productstore, setProductStore] = useState([])
      const [sales, setSales] = useState([])
      const [roles, setRoles] = useState([])
      const [purchase, setPurchase] = useState([])


      
      
      const [status, setStatus] = useState("")
      const [delstatus, delSetStatus]= useState("")
      const [viewstatus] = useState("")
      
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
                  quantity:"0",
                  price:formValue.price
              })
              .then(res => {
              setStatus(res.data)
                })      
          } 
      }, [formError])
//-----------------------------------------------------------------------------------------------------------------------------------------------  
//                                              view product store
//-----------------------------------------------------------------------------------------------------------------------------------------------


const getProductStore = () => {
    get("/productStore")
        .then(res => {
            console.log(res.data)
            setProductStore(res.data)
        })
        .catch(err => console.log(err))
}


useEffect(() => {

    getProductStore() // called the method each time when the page is loaded

}, [])



const removeHandler = (productId) => {
    remove("/productStore/" + productId)
        .then(res => {
            delSetStatus(res.data)
            getProductStore()
        })
        .catch(err => console.log(err))
}
const setData = ({productId, productName, description, quantity, price}) =>
{
    localStorage.setItem('productId',productId)
    localStorage.setItem('productName',productName)
    localStorage.setItem('description',description)
    localStorage.setItem('quantity',quantity)
    localStorage.setItem('price',price)
}
//------------------------------------------------------------------------------------------------------------------------------------------------
//                                  view sales 
//----------------------------------------------------------------------------------------------------------------------------------------------------------
const getSales = () => {
    salesget("/sales")
        .then(res => {
            console.log(res.data)
            setSales(res.data)
        })
        .catch(err => console.log(err))
}


useEffect(() => {

    getSales() // called the method each time when the page is loaded

}, [])

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                      view Purchases Record
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
const getPurchase = () => {
    purchaseget("/purchase")
        .then(res => {
            console.log(res.data)
            setPurchase(res.data)
        })
        .catch(err => console.log(err))
}


useEffect(() => {

    getPurchase() // called the method each time when the page is loaded

}, [])
//------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                     View All Roles
//------------------------------------------------------------------------------------------------------------------------------------------------------------
const getRoles = () => 
    {
        roleget("/view")
            .then(res => {
                console.log(res.data)
                setRoles(res.data)
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {

        getRoles() // called the method each time when the page is loaded

    }, [])
//------------------------------------------------------------------------------------------------------------------------------------------------
    return (
        <>
       <body  >
 {/**------------------------------------------------------------------------------------------------------------------------------------------------ */}
 {/**                                                 Title                                                                                                                       */}
 {/**------------------------------------------------------------------------------------------------------------------------------------------------*/}
                               <div class="title">
                               <div className='a'>           
                            <h1 className='hi' >Em Product Store</h1>
                            </div>
                            </div>
 {/**------------------------------------------------------------------------------------------------------------------------------------------------*/}                           
                    

                <Tabs
              defaultActiveKey=""
                 >
                     
  {/**------------------------------------------------------------------------------------------------------------------------------------------------*/}
{/**                                  Display  All Products                                                             */}
 {/**------------------------------------------------------------------------------------------------------------------------------------------------*/}

              <Tab eventKey=''  title="Home"  >
             
              <div class="but">
                                       <a href="/"><button type="submit" class="btn btn-primary">Logout</button></a>
                                    </div>
              <Container>
                                <Row>
                                    <Col>
                                         <Card>
                                        
                             {delstatus.length > 0 && (<Alert variant='danger'>{delstatus}</Alert>)}
                            <Card.Body>
                             <Table striped bordered hover size="sm">                                    <thead>
                                                    <tr>
                                                        <th scope="col">Product Name</th>
                                                        <th scope="col">Product Description</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Price( Per Item )</th>
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            productstore.map(bs => {
                                                return (
                                                        <tr key={bs.productId}>
                                                          <td>{bs.productName}</td>
                                                          <td>{bs.description}</td>
                                                          <td>{bs.quantity}</td>
                                                          <td><b>₹ </b>{bs.price}</td>
                                                          <td><a href='/be'><Button onClick={() => setData(bs)}> Update</Button></a></td>
                                                          <td><Button className='btn btn-danger' onClick={() => removeHandler(bs.productId)}> Delete</Button></td>
                                                        </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                            </Table> 
                        </Card.Body>    
                     </Card>
                </Col>
           </Row>
     </Container>  


     
              </Tab>

  {/**------------------------------------------------------------------------------------------------------------------------------------------------*/}
{/**                                              Add Product                                                                                   */}
 {/**------------------------------------------------------------------------------------------------------------------------------------------------*/}

              <Tab eventKey="new" title="Add New Product"  >
     
              <div class="but">
                                       <a href="/"><button type="submit" class="btn btn-primary">Logout</button></a>
                                    </div>
     

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
            <button  id="txt-btn">Save</button>     
            
            </form>
            </div></center>
           </div>  
           </div>         
           </div>

              </Tab>
 {/**------------------------------------------------------------------------------------------------------------------------------------------------*/}
{/**                                                        Sales View                                                                        */}
 {/**------------------------------------------------------------------------------------------------------------------------------------------------*/}

             <Tab eventKey="profile" title="Sales Record" >
             <div class="but">
                                       <a href="/"><button type="submit" class="btn btn-primary">Logout</button></a>
                                    </div>
             
            <Container>
                <Row>
                    <Col>
                        <Card>
                            {viewstatus.length > 0 && (<Alert variant='success'>{viewstatus}</Alert>)}
                            <Card.Body>
                                <Table striped bordered hover size="sm">
                                <thead>
                                        <tr>
                                            <th>Sale Id</th>
                                            <th>Product Id</th>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Sale Quantity</th>
                                            <th>User Id</th>
                                            <th>User Name</th>
                                            <th>Mobile</th>
                                            <th>Sale Date</th>
                                            <th>Sale Amount</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            sales.map(s => {
                                                return (
                                                    <tr key={s.salesId}>
                                                        <td>{s.salesId}</td>
                                                        <td>{s.productStore.productId}</td>
                                                        <td>{s.productStore.productName}</td>
                                                        <td>{s.productStore.price}</td>
                                                        <td>{s.saleQty}</td>
                                                        <td>{s.roles.rolesId}</td>
                                                        <td>{s.roles.userName}</td>
                                                        <td>{s.roles.mobile}</td>
                                                        <td>{s.saleDate}</td>
                                                        <td><b>₹ </b>{s.totalCost}</td>
                                                        
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

             
              </Tab>
  {/**------------------------------------------------------------------------------------------------------------------------------------------------*/}
 {/**                                  Purchases                                                          */}
 {/**------------------------------------------------------------------------------------------------------------------------------------------------*/}
      
        <Tab eventKey="purchases" title="purchase">

        <div class="but">
                                       <a href="/"><button type="submit" class="btn btn-primary">Logout</button></a>
                                    </div>
      
            <Container>
                <Row>
                    <Col>
                        <Card>
                            {status.length > 0 && (<Alert variant='success'>{status}</Alert>)}
                            <Card.Body>
                                <Table striped bordered hover size="sm">
                                <thead>
                                        <tr>
                                            <th>Product Id</th>
                                            <th>Product Name</th>
                                            <th>description</th>
                                            <th>Quantity</th>
                                            <th>Price(Per Item)</th>
                                            <th>Actions</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            productstore.map(product => {
                                                return (
                                                    <tr key={product.productId}>
                                                        <td>{product.productId}</td>
                                                        <td>{product.productName}</td>
                                                        <td>{product.description}</td>
                                                        <td>{product.quantity}</td>
                                                        <td><b>₹ </b>{product.price}</td>
                                                        <td><a href='/be-purchase-Product'>
 <Button className='btn btn-danger' onClick={() => setData(product)}> Purchase Product</Button></a>
                                                        </td> 
                                                        
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>


        </Tab>

 {/**------------------------------------------------------------------------------------------------------------------------------------------------*/}
 {/**                                  view Purchases                                                          */}
 {/**------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <Tab eventKey="view Purchase" title="Purchases record">
        <div class="but">
                                       <a href="/"><button type="submit" class="btn btn-primary">Logout</button></a>
                                    </div>

      
            <Container>
                <Row>
                    <Col>
                        <Card>
                            {status.length > 0 && (<Alert variant='success'>{status}</Alert>)}
                            <Card.Body>
                                <Table striped bordered hover size="sm">
                                <thead>
                                        <tr>
                                            <th>Purchase Id</th>
                                            <th>Product Id</th>
                                            <th>Product Name</th>
                                            <th>Purchase Quantity</th>
                                            <th>Price</th>
                                            <th>User Id</th>
                                            <th>User Name</th>
                                            <th>Mobile</th>
                                            <th>Purchase Date</th>
                                            <th>Purchase Cost</th>

                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            purchase.map(p => {
                                                return (
                                                    <tr key={p.purchaseId}>
                                                        <td>{p.purchaseId}</td>
                                                        <td>{p.productStore.productId}</td>
                                                        <td>{p.productStore.productName}</td>
                                                        <td>{p.purchaseQty}</td>
                                                        <td>{p.productStore.price}</td>
                                                       <td>{p.roles.rolesId}</td>
                                                       <td>{p.roles.userName}</td>
                                                       <td>{p.roles.mobile}</td>
                                                        <td>{p.purchaseDate}</td>
                                                        <td><b>₹ </b>{p.totalCost}</td>
                                                        
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>


            </Tab>


  {/**------------------------------------------------------------------------------------------------------------------------------------------------*/}
{/**                                                   view All Roles                                                                                             */}
 {/**------------------------------------------------------------------------------------------------------------------------------------------------*/}


              <Tab eventKey="contact" title="View All Roles">
              <div class="but">
                                       <a href="/"><button type="submit" class="btn btn-primary">Logout</button></a>
                                    </div>
              
            <Container>
                <Row>
                    <Col>
                        <Card>
                            
                            <Card.Body>
                                <h1 className='font'>User Details</h1>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr> 
                                                      
                                            <th>user Id</th>
                                            <th>User Name</th>
                                            <th>Email Id</th>
                                            
                                            <th>Mobile</th>
					                     <th>User Type</th>                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            roles.map(r => {
                                                return (
                                                    <tr key={r.rolesId}>
                                                        <td>{r.rolesId}</td>
                                                        <td>{r.userName}</td>
                                                        <td>{r.emailId}</td>
                                                        
                                                        <td>{r.mobile}</td>
                                                        <td>{r.userType}</td>
                                                                                                             
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>                               
                            </Card.Body>
                        </Card>
                    </Col> 
                    
                </Row>
                
            </Container>


              </Tab>
  {/**------------------------------------------------------------------------------------------------------------------------------------------------*/}

 {/**------------------------------------------------------------------------------------------------------------------------------------------------*/}
        

 {/**------------------------------------------------------------------------------------------------------------------------------------------------*/}

            </Tabs>
      
        </body>
        
        </>
       
    )
    
}

export default AddProduct