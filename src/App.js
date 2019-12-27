import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from'./components/layout/Footer';
import Products from './components/Pages/Products';
import AboutUs from './components/Pages/AboutUs';
import ContactUs from './components/Pages/ContactUs';
import SellerUpload from './components/Pages/SellerUpload';
import SignIn from './components/auth/SignIn'; 
import Chat from './components/chat/App'
import Location from './components/Pages/Location'
import Comment from './components/comment/commentBox'
import SignUpSeller from './components/auth/SignUpSeller';
import SignUpBuyer from './components/auth/SignUpBuyer';
import Home from './components/Pages/HomePage';
import Nomatch from './Nomatch';
import Profile from './components/Pages/Profile'
import EditProfile from './components/Pages/EditProfile'
import MapBuyer from './components/Pages/MapBuyerRedirect'
import setMarket from './components/Pages/SetMarketRedirect';
function App() {
  return (
    <div className="App">  
      <BrowserRouter>
      <Navbar/>
        <Switch>
        <Route exact path='/'component={Home}/>
        <Route path='/products'component={Products} />
        <Route path='/contactus'component={ContactUs}/>
          <Route path='/aboutus'component={AboutUs}/> 
          <Route path='/signin'component={SignIn}/> 
          <Route path='/setmarket'component={setMarket}/> 
          <Route path='/chat/:id' component={Chat}/>
          <Route path='/comment/:id' component={Comment}/>
          <Route path='/signupBuyer'component={SignUpBuyer}/> 
          <Route path='/signupSeller'component={SignUpSeller}/>
          <Route path='/addproducts'component={SellerUpload}/> 
          <Route path='/mapBuyer'component={MapBuyer}/>
          <Route path='/profile'component={Profile}/>
          <Route path='/editprofile'component={EditProfile}/>
          <Route exact path='*' component={Nomatch} />
        </Switch>
        <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
