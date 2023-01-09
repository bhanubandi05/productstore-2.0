import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Alert } from 'react-bootstrap'
import { salesget } from '../components/service/SalesService'




const ViewSales = () => {


    const [sales, setSales] = useState([])
    const [status] = useState("")


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



    return (
        <>
                          <div class="body1">
        <div class='home'  style = {{color: 'white'}}>
            <h1>EMinds Product Store</h1>
            <p>The Best Product Store</p>
        </div>
        </div>
                            <nav class="navbar navbar-light bg-dark">
                                   <a class="navbar-brand" href="#" style={{color: 'white'}}>Sales Records</a>
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
                                            <th>Sale Id</th>
                                            <th>Product Id</th>
                                            <th>Sale Quantity</th>
                                            <th>Sale Amount</th>
                                            <th>User Id</th>
                                            <th>Sale Date</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            sales.map(s => {
                                                return (
                                                    <tr key={s.salesId}>
                                                        <td>{s.salesId}</td>
                                                        <td>{s.productId}</td>
                                                        <td>{s.saleQty}</td>
                                                        <td><b>₹ </b>{s.totalCost}</td>
                                                        <td>{s.rolesId}</td>
                                                        <td>{s.saleDate}</td>
                                                        
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

export default ViewSales 