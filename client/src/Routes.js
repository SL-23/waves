import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Components/Home';
import Product from './Components/Product';
import RegisterLogin from './Components/Register_login';
import Register from './Components/Register_login/Register';
import Layout from './hoc/Layout';
import UserDashboard from './Components/User';
import AddProduct from './Components/User/Admin/AddProduct';
import ManageCategories from './Components/User/Admin/ManageCategories';
import Auth from './hoc/Auth';
import Shop from './Components/Shop';
import Cart from './Components/User/Cart'
import UpdateProfile from './Components/User/UpdateProfile';

const Routes = () => {
  return (
  	<Layout>
	    <Switch>
	    	<Route path="/user/dashboard" exact component= { Auth(UserDashboard, true) }/>
	    	<Route path="/user/cart" exact component= { Auth(Cart, true) }/>
	    	<Route path="/user/user_profile" exact component= { Auth(UpdateProfile, true) }/>

	    	<Route path="/admin/add_product" exact component= { Auth(AddProduct, true) }/>
	    	<Route path="/admin/manage_categories" exact component= { Auth(ManageCategories, true) }/>

	    	<Route path="/register_login" exact component= { Auth(RegisterLogin, false) }/>
	    	<Route path="/register" exact component= { Auth(Register, false) }/>
	    	<Route path="/shop" exact component= { Auth(Shop, null) }/>
	    	<Route path="/product_detail/:id" exact component= { Auth(Product, null) }/>

	    	<Route path="/" exact component= { Auth(Home, null) }/>
	    </Switch>
	</Layout>
  )
};

export default Routes;