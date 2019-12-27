import React, { Component } from 'react'
import Carousel from "react-multi-carousel";
import bg_1 from '../../images/bg_1.jpg';
import './Products.css';
import {connect} from 'react-redux';
import {compose} from 'redux'
import{Redirect,Link} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { Avatar, Typography, Button, Col,Card } from 'antd';
const { Title } = Typography;
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
  
class Profile extends Component {
  state={
    search:'',
    location:'',
    value:[],
    list:''
  }

  render() {
    const { authError,auth,profile ,seller,id} = this.props;
    console.log(profile)
    console.log("seller",seller)
    const styles = {
      color:'#000',
      fontFamily:'poppins,Arial,sans-serif',
      lineHeight:'1.5', 
      fontweight:'30',
      fontSize:'18px'
    }
    if(profile.userType==='Buyer') return <Redirect to='/'/>
    if(!auth.uid) return<Redirect to='/'/>  
    return (
   <div>
   <section class="ftco-section contact-section bg-light">
<div class="container py-5">
<div class="row">
 <div class="col-md-10 mx-auto bg-white" >
 <h2 style={styles}  class='pb-2 pt-4 text-center'>Edit your Profile</h2>
           <form class="p-5">
           <Col style={{ marginBottom: '80px' }} align='center'>
  <Avatar size={100} icon='user' />
    <Title style={{ fontSize: '14px', margin: '10px 0' }}>{this.props.profile.name}</Title>
  <Link to='/editprofile'>
  <Button shape='round' style={{backgroundColor:'rgb(130, 174, 70)',color:'white'}}>Edit Your Profile</Button>
  </Link>
  </Col>
  <Col  align='center'>
<Card className="col-sm-12 border-1 px-0 m-0" size='large' >
  <div class="row mt-0 mb-5" >
      <div class="pl-0 col-sm-12 col-lg-6 d-flex ant-row-flex-start">
        <h5>your products</h5>
      </div>
      
      <div class=" col-sm-12 col-lg-6 d-flex flex-lg-row-reverse pr-0"> 
        <a href="/addproducts?" > 
              <Button  shape='round' style={{backgroundColor:'rgb(130, 174, 70)',color:'white'}}>
              Add new products</Button>
            </a>
      </div>
      <div style={{marginTop:'2%',marginLeft:'5%' ,width:'90%',border:'solid',borderColor:'white',borderBottomColor:'gray'}}></div>
</div>
 {seller &&seller.map((list,index)=>{
   console.log(list.authId===auth.uid,auth.uid,list)
   if(list.authId===auth.uid)
  {return(
   <div class="row"  style={{marginLeft:'10%',paddingBottom:'3%'}}>
  <div class="col-md-6 col-lg-6 ">
   <div class="product">
   <Carousel  autoPlay   responsive={responsive} showArrows={true} infinite="true"  showIndicators={true} showThumbs={false}>
          {list.photo&&list.photo.map((image,i)=>{
           return ( 
            <img class="img-fluid" src={image} alt="Colorlib Template"/>
           )
          })}
             </Carousel>
         </div>
               </div>
                  <div class="col-md-6 col-lg-4" >
                  <div class="product"  style={{border:'0'}}>
  <div>
  <h3 style={{color:'#000',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'400'}}>{list.businessName}</h3>
<h5 style={{color:'#82ae46',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'30'}}>Catagory:{list.catagory}</h5>
 <h6 style={{color:'#000',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'30'}}>
   @{list.marketName}</h6>
<h5 style={{color:'#000',fontSize:'18px',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5'}}>
Product Description </h5>
    <p style={{fontSize:'15px',fontFamily:'poppins,Arial,sans-serif'}}>{list.discription}</p>
    </div>
   <div class="text py-3 pb-4 px-3 text-center">
                  <div class="d-flex">
                  <div class="pl-2">
                 <p ><span>Price:${list.price}</span></p>
                  </div>
                  </div>
             <div class=" d-flex px-3 ">
             <div class="m-auto d-flex" >
                          <Link to={'/comment/' + list.id} class="heart d-flex justify-content-center align-items-center  pr-3 ">
                          <span><i  style={{fontSize:'200%',color:'#82ae46'}}  class="ion-ios-heart"></i></span>
                          </Link>
                          <Link to={'/comment/' + list.id} class="heart d-flex justify-content-center align-items-center  pr-3 ">
                        <span><i  style={{fontSize:'200%',color:'#82ae46'}}  class="ion-ios-mail"></i></span>
                          </Link>
                          <Link to={'/chat/' + list.id}  class="buy-now d-flex justify-content-center align-items-center mx-1  pr-3">
                          <span><i  style={{fontSize:'200%',color:'#82ae46'}} class="ion-ios-chatbubbles" ></i></span>
                          </Link>
                          <div class="dropdown dropright">
                          <a href="#"  class=" dropdown-toggle mt-5 " id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" class="buy-now d-flex justify-content-center align-items-center mx-1 pr-3">
                          <span><i   style={{fontSize:'200%',color:'#82ae46'}} class="ion-md-share"></i></span>
                          </a>
                         </div>
                          </div>
              </div>
                  </div>
                  </div>
                  </div>
                  </div>

    )}
    else{
      return(
      <>
        </>
      )
    }
        })} 
    </Card>
    </Col>


  </form>
</div>
  </div>
</div>
</section>
                  </div>
      );
  }
}
  
const mapStateToProps=(state,ownProps)=>{

  const id=ownProps.match.params.id;
  const uPhoto=state.firestore.data.sellerUpload;
  const UPhotoS=uPhoto?uPhoto[id]:null;
  console.log(UPhotoS)
  return{
    sellerId:id,
    seller:state.firestore.ordered.sellerUpload,
     auth:state.firebase.auth,
    profile:state.firebase.profile
  }

}
export default compose(connect(mapStateToProps),
  firestoreConnect([
    {collection:'sellerUpload',orderedBy:['time','desc']},
  
]))(Profile);







