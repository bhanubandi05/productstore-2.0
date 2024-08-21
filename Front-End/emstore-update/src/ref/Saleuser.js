import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Alert } from 'react-bootstrap'
import { get } from '../components/service/SalesService'

const Sales = () => {
    const [userId, setUserId] = useState(localStorage.getItem("userId"))
    const [sales, setSales] = useState([])
    const [productDetails, setProductDetails] = useState([])
   
    const [displayDetails, setDisplayDetails] = useState([])    
    

    const getSales = () => {
       
        axios.get("http://localhost:8080/api/v3/sales")
            .then(res => {               
                setSales(res.data)
            })
            .catch(err => console.log(err))
        }
    const getProduct = () => {
        axios.get("http://localhost:8080/api/v1/productStore")
        .then(res => { setProductDetails(res.data)
            }).catch(err => console.log(err))
        }

        const salesDetails = (e) =>
        {
             
            let details = [];
            if(sales.length == 0)
                getSales();
            if(productDetails.length == 0)
                getProduct();      
            
            sales.map(s => 
            {          
                if((s.rolesId) == userId)
                {   
                    productDetails.map(m =>
                    {
                            if((m.productId) == (s.productId) )
                            {
                                details.push({
                                    salesId: s.salesId,
                                    productId: s.productId,
                                    productName: m.productName,
                                    price: m.price,
                                    saleQty: s.saleQty,
                                    saleDate: s.saleDate,
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
        salesDetails()   
        
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
                                            <th>Sales Id</th>
                                            <th>Product Id</th>
                                            <th>product Name</th>
                                            <th>Price</th>
                                            <th>Sale Quantity</th>
                                            <th>Total Cost</th>
                                            <th>Sale Date</th>                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        displayDetails.map(p => {
                                                return (
                                                    <tr key={p.salesId}>
                                                        <td>{p.salesId}</td>
                                                        <td>{p.productId}</td>
                                                        <td>{p.productName}</td>
                                                        <td>{p.price}</td>
                                                        <td>{p.saleQty}</td>
                                                        <td><b>₹ </b>{p.totalCost}</td>
                                                        <td>{p.saleDate}</td>                                                        
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

export default Sales
