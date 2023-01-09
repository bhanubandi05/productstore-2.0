import React from 'react'
import { Tabs,Tab,key,setKey, Dropdown,Carousel } from 'react-bootstrap'

const Home = () => {
    return (
        <>
                            <div class="body1">
        <div class='home'  style = {{color: 'white'}}>
            <h1>EMinds Product Store</h1>
            <p>The Best Product Store</p>
        </div>
        </div>
   <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <a class="navbar-brand" href="#" style={{color: 'white'}}>EMinds - ProductStore</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>
      
     <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
      
      <div class=''>
      <Dropdown >
        <Dropdown.Toggle class='button'  variant="success" >
        ProductStore Activities
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="/add-NewProduct">
            Add New Product
          </Dropdown.Item>
          <Dropdown.Item href="/productStore">
          ProductStore Details
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>

    <div style={{ display: 'block', 
                  width: 200, 
                  padding: 2 }}>
      <Dropdown>
        <Dropdown.Toggle variant="success">
        Purchase Activities
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="/purchase">
          Purchase
          </Dropdown.Item>
          <Dropdown.Item href="/View-purchase">
          Purchase Records
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>


     
     <li class="nav-item active">
        <button class="btn3 btn-primary" > 
        <a class="nav-link active" href="/View-sales" style={{color: 'white'}} id="user">Sales Records</a></button>
    </li>
                  
         
    
    <li class="nav-item active">
        <button class="btn3 btn-primary"> <a class="nav-link active" href="/View-Roles" style={{color: 'white'}} id="user">Users</a></button>
    </li>
    <div class="logout">
    <li class="nav-item">
    <button class="btn3 btn-primary" id="log-out"><a class="nav-link active" href="/" style={{color: 'white'}} id="log-out">Logout</a></button>
    </li>
    </div>
    </ul>
  </div>
</nav>


<Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Home">
      </Tab>
      <Tab eventKey="profile" title="Profile">
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
      </Tab>
    </Tabs>



<Carousel>
      <Carousel.Item interval={1000}>
        <img
          class='img1'
          src="cart.jpg"
          alt="First slide"
        />
        
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          class='img1'
          src="https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Second slide"
        />
        
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          class='img1' 
          src="https://media.istockphoto.com/id/1278928158/photo/young-woman-diwali-celebrate-stock-photo.jpg?b=1&s=612x612&w=0&k=20&c=lnxdSSwr-EN5514Mp4KPnUM6plbSNMWVVGdZJ0fzJIM="
          alt="Third slide"
        />
        
        
      </Carousel.Item>
    </Carousel>


        </>
        
    )
    
}

export default Home