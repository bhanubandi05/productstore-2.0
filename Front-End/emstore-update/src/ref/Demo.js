import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Alert } from 'react-bootstrap'
import { get } from '../components/service/PurchaseService'

const Purchase = () => {
    const [userId, setUserId] = useState(localStorage.getItem("userId"))
    const [purchase, setPurchase] = useState([])
    const [productDetails, setProductDetails] = useState([])
   
    const [displayDetails, setDisplayDetails] = useState([])    
    

    const getPurchase = () => {
       
        get("/purchase")
            .then(res => {               
                setPurchase(res.data)
            })
            .catch(err => console.log(err))
        }
    const getProduct = () => {
        axios.get("http://example.backend.com/api/v1/productStore")
        .then(res => { setProductDetails(res.data)
            }).catch(err => console.log(err))
        }

        const purchaseDetails = (e) =>
        {
             
            let details = [];
            if(purchase.length == 0)
                getPurchase();
            if(productDetails.length == 0)
                getProduct();      
            
            purchase.map(s => 
            {          
                if((s.rolesId) == userId)
                {   
                    productDetails.map(m =>
                    {
                            if((m.productId) == (s.productId) )
                            {
                                details.push({
                                    purchaseId: s.purchaseId,
                                    productId: s.productId,
                                    productName: m.productName,
                                    price: m.price,
                                    purchaseQty: s.purchaseQty,
                                    purchaseDate: s.purchaseDate,
                                    totalCost: s.totalCost
                                    });
                            }//if
                    })//product details
                }
            })
            setDisplayDetails(details)
        }

    useEffect(() => {
         // called the method each time when the page is loaded   
        purchaseDetails()   
        
    })


    return (
        
        <>
                           <div class="body1">
        <div class='home'  style = {{color: 'white'}}>
            <h1>EMinds Product Store</h1>
            <p>The Best Online Product Store</p>
        </div>
        </div>
                            <nav class="navbar navbar-light bg-dark">
                                   <a class="navbar-brand" href="#" style={{color: 'white'}}>Sales Records</a>
                                   <div class="Button2">
                                       <a href="/Sales"><button type="submit" class="btn btn-primary">Back</button></a>
                                    </div>
                            </nav>
            <Container>
                <Row>
                    <Col>
                        <Card>
                            
                            <Card.Body>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>purchase Id</th>
                                            <th>Product Id</th>
                                            <th>product Name</th>
                                            <th>Price</th>
                                            <th>purchase Quantity</th>
                                            <th>Total Cost</th>
                                            <th>purchase Date</th>                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        displayDetails.map(p => {
                                                return (
                                                    <tr key={p.purchaseId}>
                                                        <td>{p.purchaseId}</td>
                                                        <td>{p.productId}</td>
                                                        <td>{p.productName}</td>
                                                        <td>{p.price}</td>
                                                        <td>{p.purchaseQty}</td>
                                                        <td><b>₹ </b>{p.totalCost}</td>
                                                        <td>{p.purchaseDate}</td>                                                        
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
        </>
    )
}

export default Purchase
