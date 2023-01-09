import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Alert, Button } from 'react-bootstrap'

import { get, remove } from '../components/service/ProductStoreService'




const ViewProductStore = () => {


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



    const removeHandler = (productId) => {
        remove("/productStore/" + productId)
            .then(res => {
                setStatus(res.data)
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

    return (
        <>
                           <div class="body1">
        <div class='home'  style = {{color: 'white'}}>
            <h1>EMinds Product Store</h1>
            <p>The Best Product Store</p>
        </div>
        </div>
                            <nav class="navbar navbar-light bg-dark">
                                   <a class="navbar-brand" href="#" style={{color: 'white'}}>Products Details</a>
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
                                                          <td><Button className='btn btn-danger' onClick={() => removeHandler(bs.productId)}> Delete</Button></td>
                                                          <td><a href='/update-product'><Button onClick={() => setData(bs)}> Update</Button></a></td>
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

export default ViewProductStore
