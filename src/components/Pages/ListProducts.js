import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import bg_1 from '../../images/bg_1.jpg';
import product_1 from '../../images/product_1.jpg'
import '../style.css'
import React, { Component } from 'react'
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import {connect} from 'react-redux';
import  {Link} from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  FacebookShareButton,FacebookShareCount, FacebookIcon,TelegramIcon,
  WhatsappIcon,
  TwitterIcon} from 'react-share';
 
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

const  ListProducts=(props) => {
  const {seller,location,southWest,northEast}=props
  let flag=0
  let counter=[]
  let url = window.location.href;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
   const twitterUrl = `https://twitter.com/sharer/sharer.php?u=${url}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
  const telegramUrl=`https://telegram.me/share/url?url=${url}`
  const whatsupUrl=`whatsapp://send?text=${url}`
  let shareUrl='https://www.facebook.com/'
  
  return(
    <div>
 
{seller &&seller.map((list,index)=>{
      flag=0
      if(northEast&&southWest)
            {if((list.lat>northEast.lat || list.lat<southWest.lat)||(list.lng>northEast.lng || list.lng<southWest.lng))
            {
              console.log('i have found one',list.lat,northEast.lat,southWest.lat,list.businessName)
              flag=1
            }else{
              counter.push(list)
            }}
          
      if(flag===1){
        return(<></>)
      }
      else if (index%2===0){
        return(
      < div class="container" style={{minHeight:'400px'}}>
       <div class="row"  style={{marginLeft:'10%',paddingBottom:'3%'}}>
      <div class="col-md-6 col-lg-6 ">
       <div class="product">
       <Carousel  autoPlay   responsive={responsive} showArrows={true}  infinite="true"  showIndicators={true} showThumbs={false}>
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
  <h5 style={{color:'#000',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'30'}}>
Product Description </h5>
        <p>{list.description}</p>
        </div>
       <div class="text py-3 pb-4 px-3 text-center">
                      <div class="d-flex">
                      <div class="pl-2">
                     <p style={{paddingTop:'27%'}}><span>Price:${list.price}</span></p>
                      </div>
                      </div>
                 <div class=" d-flex px-3 ">ios
                 <div class="m-auto d-flex" style={{paddingTop:'20%'}}>
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
                              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                                <a class="dropdown-item" href={twitterUrl} target="_blank"> <TwitterIcon size={32} round={true}/>Twitter </a> 
                                <a class="dropdown-item"  href={facebookUrl} target="_blank"> <FacebookIcon size={32} round={true}   />FaceBook</a> 
                                <a class="dropdown-item" href={telegramUrl} target="_blank"><TelegramIcon size={32} round={true}  />Telegram</a>
                                <a class="dropdown-item" href={whatsupUrl} target="_blank"><WhatsappIcon size={32} round={true}  />Whatsapp</a>
                             </div>
                             </div>
                              </div>
                  </div>
                      </div>
                      </div>
                      </div>
                      </div>
         </ div>
        )}else{
     
   return(
    < div class="container"style={{minHeight:'400px'}}>
     <div class="row"  style={{marginLeft:'10%',paddingBottom:'3%'}}>
     <div class="col-md-6 col-lg-4 " >
       <div class="product pl-3"  style={{border:'0'}}>
       <div>
         </div>
         <div>
      <h3 style={{color:'#000',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'400'}}>{list.businessName}</h3>
    <h5 style={{color:'#82ae46',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'30'}}>Catagory:{list.catagory}</h5>
     <h6 style={{color:'#000',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'30'}}>
       @{list.marketName}</h6>
  <h5 style={{color:'#000',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'30'}}>
Product Description </h5>
        <p>{list.description}</p>
        </div>
 <div class="overlay"></div>
                <div class="text py-3 pb-4 px-3 text-center">
    <h3><a href="#"></a></h3>
                <div class="d-flex">
                <div class="pl-2">
   <p style={{marginTop:'27%'}}><span>Price:${list.price}</span></p>
                </div>
                </div>
           <div class=" d-flex px-3 " style={{paddingTop:'18%'}}>
                        <div class="m-auto d-flex">
                        <Link to={'/comment/' + list.id} class="heart d-flex justify-content-center align-items-center  pr-3 ">
                        <span><i  style={{fontSize:'200%',color:'#82ae46'}}  class="ion-ios-heart"></i></span>
                        </Link>
                        <Link to={'/comment/' + list.id} class="heart d-flex justify-content-center align-items-center  pr-3 ">
                        <span><i  style={{fontSize:'200%',color:'#82ae46'}}  class="ion-ios-mail"></i></span>
                        </Link>
                        
                        <Link to={'/chat/' + list.id} class="heart d-flex justify-content-center align-items-center  pr-3 ">
                        <span><i  style={{fontSize:'200%',color:'#82ae46'}}  class="ion-ios-chatbubbles"></i></span>
                        </Link>
                        <div class="dropdown dropright">
                              <a href="#"  class=" dropdown-toggle mt-5 " id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" class="buy-now d-flex justify-content-center align-items-center mx-1 pr-3">
                              <span><i   style={{fontSize:'200%',color:'#82ae46'}} class="ion-md-share"></i></span>
                              </a>
                              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                                <a class="dropdown-item" href={twitterUrl} target="_blank"> <TwitterIcon size={32} round={true}/>Twitter </a> 
                                <a class="dropdown-item"  href={facebookUrl} target="_blank"> <FacebookIcon size={32} round={true}   />FaceBook</a> 
                                <a class="dropdown-item" href={telegramUrl} target="_blank"><TelegramIcon size={32} round={true}  />Telegram</a>
                                <a class="dropdown-item" href={whatsupUrl} target="_blank"><WhatsappIcon size={32} round={true}  />Whatsapp</a>
                             </div>
                             </div>
                        </div>
                        </div>
                        </div>
                </div>
         </div>
  <div class="col-md-6 col-lg-6">
            <div class="product">
          <Carousel autoPlay   infiniteLoop responsive={responsive} showArrows={true} infinite="true"  showThumbs={false}  dotColor={'red'} swipeable style={{backgroundColor:'red'}}
          renderDotsOutside={true}>
               {list.photo&&list.photo.map((image,i)=>{
               return ( 
            <img class="img-fluid"   style={{backgroundColor:'red'}}src={image} alt="Colorlib Template"/>
              )
              })}
                 </Carousel>
        </div>
       </div>
      </div>
  </ div>
      )
        }

  } )}
  {counter.length===0?<h2 style={{textAlign:'center'}}>Product not found</h2>:null}
   </div>
    )

}


export default ListProducts;
