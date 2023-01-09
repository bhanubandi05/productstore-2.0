import React from 'react';
import { Routes, Route  } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Home from './components/common/Home';
//import AddNewProduct from './components/productstore/AddNewProduct';
//import ProductStore from './components/productstore/ViewProductStore';
//import UpdateProduct from './components/productstore/UpdateProduct';
//import Purchase from './components/productstore/Purchase';
//import PurchaseProduct from './components/productstore/PurchaseProduct';
//import  ViewPurchaseDetails from './components/productstore/ViewPurchaseDetails';
//import Sales from './components/productstore/Sales';
//import SaleProduct from './components/productstore/SaleProduct';
//import ViewSalesDetails from './components/productstore/ViewSalesDetails';
//import ViewRoles from './components/productstore/Form';
//import Saleuser from './components/productstore/Saleuser';
//import Registration from './components/common/Registration';
//import Login from './components/common/Login';
//import Add from './components/productstore/Add';
//import Regis1 from './components/common/Regis1';
import SignIn from './components/common/SignIn';
import SignUp from './components/common/SignUp'
import BePurchaseProduct from './components/productstore/BePurchaseProduct';
import BeSales from './components/productstore/BeSales';
import BeSalesProduct from './components/productstore/BeSalesProduct';
import BeSalesUser from './components/productstore/BeSalesUser';
import BeUpdateProduct from './components/productstore/BeUpdateProduct';
import BeHome from './components/common/BeHome';





function App() {
  return (
    <>
    
    <Routes>
     
     <Route path="/home" element={<BeHome />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/be" element={<BeUpdateProduct />} />
      <Route path="/be-purchase-product" element={<BePurchaseProduct/>} />
      <Route path="/besales" element={<BeSales/>} />
      <Route path="/besalesproduct" element={<BeSalesProduct/>} />
      <Route path="/besalesuser" element={<BeSalesUser/>} />


    </Routes>
  </>
  );
}

export default App;
