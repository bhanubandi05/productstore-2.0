import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Alert } from 'react-bootstrap'

const Sales = () => {
    const [userId, setUserId] = useState(localStorage.getItem("userId"))
    const [sales, setSales] = useState([])
    const [productDetails, setProductDetails] = useState([])
   
    const [displayDetails, setDisplayDetails] = useState([])    
    

    const getSales = () => {
       
        axios.get("http://example.backend.com/api/v3/sales")
            .then(res => {               
                setSales(res.data)
            })
            .catch(err => console.log(err))
        }
   
        const salesDetails = (e) =>
        {
             
            let details = [];
            if(sales.length == 0)
                getSales();    
            
            sales.map(s => 
            {          
                if((s.roles.rolesId) == userId)
                {   
                   
                  details.push({
                                    salesId: s.salesId,
                                    productId: s.productStore.productId,
                                    productName: s.productStore.productName,
                                    price: s.productStore.price,
                                    saleQty: s.saleQty,
                                    saleDate: s.saleDate,
                                    totalCost: s.totalCost
                                    });
                            //if
                    //product details
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
                           <div class="title">
                               <div className='a'>           
                            <h1 className='hi' >Em Product Store</h1>
                            </div>
                            </div>
                            <nav class="navbar navbar-light bg-dark">
                                   <a class="navbar-brand" href="#" style={{color: 'white'}}>Sales Records</a>
                                   <div class="Button2">
                                       <a href="/besales"><button type="submit" class="btn btn-primary">Back</button></a>
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
