import React, {useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Alert, Table } from 'react-bootstrap'
import { roleget } from '../components/service/RoleService'
import {Link} from 'react-router-dom'



const Roles = () => {

     const [roles, setRoles] = useState([])
    const [status, setStatus] = useState("")

    
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

    
    return (
        <>
        <div class="body1">
        <div class='home'  style = {{color: 'white'}}>
            <h1>EMinds Product Store</h1>
            <p>The Best Product Store</p>
        </div>
        </div>
        <div class="Button2">
                                       <a href="/home"><button type="submit" class="btn btn-primary">Go to home</button></a>
                                    </div>
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>Product List</Card.Header>
                           
                            <Card.Body>
                                <h1>User Details</h1>
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
        </>
        
    )
}

export default Roles