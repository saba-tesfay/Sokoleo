import React from 'react'
import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authActions'
import AboveNavbar from './AboveNavbar';
import{Redirect,Link} from 'react-router-dom'
const SignedIn = (props) => {
  const {auth,profile,id}=props
  console.log("auth",auth.uid)
    return (
     <div>  
        <AboveNavbar/>     
<nav  class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
<div class="container">
<a class="navbar-brand"  href="./"><i  class="ion-ios-home pr-2"/>Sokoleo</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
<span class="oi oi-menu"></span> Menu</button>
<div class="collapse navbar-collapse" id="ftco-nav">
<ul class="navbar-nav ml-auto">
{(profile.userType==='Buyer')?
<li class="nav-item"><a href="/" class="nav-link"><i  class="icon-shopping_cart pr-2 "/>products</a></li>:null}

<li class="nav-item"><a href="./chat" class="nav-link"><i  class="ion-ios-chatbubbles pr-2"/>My chat</a></li>
{(profile.userType==='Buyer')?
<li class="nav-item"><a href="./profileBuyer" class="nav-link"><i  class="ion-ios-person pr-2"/>Profile</a>
</li>:<li class="nav-item"><a href="./profile" class="nav-link"><i  class="ion-ios-person pr-2"/>Profile</a></li>}

<li class="nav-item"><a href="./contactus" class="nav-link"><i  class="ion-ios-call pr-2"/>Contact us</a></li>
<li class="nav-item"><a href="./aboutus" class="nav-link"><i  class="ion-ios-alert pr-2"/>About Us</a></li>
{(profile.userType==='Buyer')?<li class="nav-item"><a href="./mapbuyer"   class="nav-link"><i  class="ion-ios-map pr-2"/>Map</a></li>:null}
<li class="nav-item"><a href=""onClick={props.signOut}  class="nav-link"><i  class="ion-ios-log-out pr-2"/>Log Out</a></li>
</ul>
</div>
</div>
</nav>
</div>  


    )
}
const mapStateToProps = (state) => {
    console.log(state);
    return{
      auth: state.firebase.auth,
      profile:state.firebase.profile
    }
  }

const mapDispatchToProps=(dispatch)=>{
    return{
        signOut:()=>dispatch(signOut())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignedIn);
