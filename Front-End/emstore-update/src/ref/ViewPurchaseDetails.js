import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Alert } from 'react-bootstrap'
import { purchaseget } from '../components/service/PurchaseService'




const Purchase = () => {


    const [purchase, setPurchase] = useState([])
    const [status] = useState("")


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



    return (
        <>
                           <div class="body1">
        <div class='home'  style = {{color: 'white'}}>
            <h1>EMinds Product Store</h1>
            <p>The Best Product Store</p>
        </div>
        </div>
                            <nav class="navbar navbar-light bg-dark">
                                   <a class="navbar-brand" href="#" style={{color: 'white'}}>Purchase Records</a>
                                   <div class="Button2">
                                       <a href="/home"><button type="submit" class="btn btn-primary">Go to home</button></a>
                                    </div>
                            </nav>
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
                                            <th>Purchase Quantity</th>
                                            <th>Purchase Cost</th>
                                            <th>User Id</th>
                                            <th>Purchase Date</th>

                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            purchase.map(p => {
                                                return (
                                                    <tr key={p.purchaseId}>
                                                        <td>{p.purchaseId}</td>
                                                        <td>{p.productId}</td>
                                                        <td>{p.purchaseQty}</td>
                                                        <td><b>₹ </b>{p.totalCost}</td>
                                                        <td>{p.rolesId}</td>
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
