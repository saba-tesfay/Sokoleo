import React,{Component} from 'react'
import bg_1 from '../../images/bg_1.jpg'
import bg_2 from '../../images/bg_2.jpg'
import{Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import catagory from '../../images/category.jpg'
import catagory1 from '../../images/category-1.jpg'
import catagory2 from '../../images/category-2.jpg'
import catagory3 from '../../images/category-3.jpg'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Homepage.css'

import catagory4 from '../../images/category-4.jpg'
const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
class HomePage extends Component{
render(){
    const { authError,auth } = this.props;
    if(auth.uid) return<Redirect to='/products'/>
    return(<>
    
<section id="home-section" class="hero">
        <Carousel responsive={responsive} autoPlay="true" infinite="true" autoPlaySpeed='6000' >
        <div class="slider-item" style={{height:'800px',backgroundImage: `url(${bg_1})`}}>
                        <div class="overlay"></div>
                        <div class="container">
                            <div class="row  justify-content-center align-items-center"  data-scrollax-parent="true">
                                <div class="col-md-12  text-center"style={{marginTop:'25%'}}>
                                    <h1 class="mb-2" style={{color:'white',fontSize: '70px',fontWeight: '400',fontFamily:'Amatic SC'}}>We Tell You Exactly Where to Find &amp; The Products You Want to Buy</h1>
                                    <h2 class="subheading mb-4"style={{fontWeight: '300',marginTop:'5%',fontSize: '20px',letterSpacing: '4px',textTransform: 'uppercase',display: 'inline-block',color: '#fff'}}>Register To See &amp; The Products You want</h2>
                                    <p><a href="/signupBuyer?#" class="btn btn-primary btn-r1"style={{marginTop:'10%'}}>Register As Buyer</a></p>
                                </div>
                            </div>
                    </div>
                </div>
                <div class="slider-item " style={{height:'800px',backgroundImage: `url(${bg_2})`}}>
                    <div class="overlay"></div>
                    <div class="container">
                        <div class="row  justify-content-center align-items-center" data-scrollax-parent="true">
                            <div class="col-sm-12  text-center"style={{marginTop:'25%'}} >
                                <h1 class="mb-2" style={{color:'white',fontSize: '70px',fontFamily:'Amatic SC'}}>We Tell Where Your Customers Can &amp; Find You</h1>
                                <h2 class="subheading mb-4"style={{fontWeight: '300',marginTop:'5%',fontSize: '20px',letterSpacing: '4px',textTransform: 'uppercase',display: 'inline-block',color: '#fff'}}>We Bring The Customer  &amp; To You</h2>
                                <p><a href="/signupSeller?#" class="btn btn-primary btn-r1"style={{marginTop:'10%'}}>Register As Seller</a></p>
                            </div>
                        </div>
                    </div>
                    </div>
                
                    </Carousel>
                
</section>
    
        
<div style={{marginTop:'30',marginLeft:'10%', border:'solid',borderColor:'white',borderBottomColor:'gray',width:'80%'}}>
<p></p>
</div>
<section class="ftco-section ftco-category ftco-no-pt ">
    <div class="container " style={{marginTop:'50'}}>
        <div class="row">
        <div class="col-md-8">
        <div class="row">
        <div class="col-md-6 order-md-last  align-items-stretch d-flex">
        <div class="category-wrap-2  img align-self-stretch d-flex" style ={{ backgroundImage:`url(${catagory})`}}>
        <div class="text text-center">
        <h2 className="title">Register Here</h2>
        <p><a href="/signupSeller?#" class="btn btn-primary mt-4 btn-r " >As Seller</a></p>
        <p><a href="/signupBuyer?#" class="btn btn-primary btn-r" >As Buyer</a></p>
        <p>Already have an account?  <a className="signIn" href="/signin">Sign In</a></p>
        </div>
        </div>
        </div>
        <div class="col-md-6">
        <div class="category-wrap  img mb-4 d-flex  align-items-end" style ={{ backgroundImage:`url(${catagory1})`}}>
        <div class="text px-3 py-1">
        <h2 class="mb-0"><a href="#">Fruits</a></h2>
        </div>
        </div>
        <div class="category-wrap  img d-flex align-items-end" style ={{ backgroundImage:`url(${catagory2})`}}>
        <div class="text px-3 py-1">
        <h2 class="mb-0"><a href="#">Vegetables</a></h2>
        </div>
        </div>
        </div>
        </div>
        </div>
        <div class="col-md-4">
        <div class="category-wrap  img mb-4 d-flex align-items-end" style ={{ backgroundImage:`url(${catagory3})`}}>
        <div class="text px-3 py-1">
        <h2 class="mb-0"><a href="#">Juices</a></h2>
        </div>
        </div>
        <div class="category-wrap  img d-flex align-items-end" style ={{ backgroundImage:`url(${catagory4})`}}>
        <div class="text px-3 py-1">
        <h2 class="mb-0"><a href="#">Dried</a></h2>
        </div>
        </div>
        </div>
    </div>
</div>
</section>

   </> )
}
}
const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      auth:state.firebase.auth
    }
  }
  
 
  
  export default connect(mapStateToProps)(HomePage)
