import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Alert, Button } from 'react-bootstrap'
import { get } from '../components/service/ProductStoreService'




const Purchase = () => {


    const [productstore, setProductStore] = useState([])
    const [status, setStatus] = useState("")


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

    const setData = ({productId, productName, description, quantity, price}) =>
    {
        localStorage.setItem('productId',productId)
        localStorage.setItem('productName',productName)
        localStorage.setItem('description',description)
        localStorage.setItem('quantity',quantity)
        localStorage.setItem('price',price)
    }



    return (
        <>
                            <div class="body1">
        <div class='home'  style = {{color: 'white'}}>
            <h1>EMinds Product Store</h1>
            <p>The Best Product Store</p>
        </div>
        </div>
                            <nav class="navbar navbar-light bg-dark">
                                   <a class="navbar-brand" href="#" style={{color: 'white'}}>Purchase</a>
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
                                                        <td><a href='/purchase-Product'>
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



        </>
    )
}

export default Purchase
