import React, { Component } from 'react';
import Messages from './messages'
import Input from "./Input";
import Carousel from "react-multi-carousel";
import './App.css'
import messageIcon from '../img/message.png'
import likesIcon from '../img/likes.png'
import commentIcon from '../img/comments_48px.png'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
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
const ImageFormatter=(props)=>{
  return(
    <img className="pr-2" src={props.src} alt={props.alt} width={30}/>
  )
}

class App extends Component {
     render() {
       const {userType, auth,imageId,uploadedPhoto,profile,chatMessage}=this.props;

       console.log('profile photo from chat app',profile)
      //  const { AlternateNum , PhoneNum,name  }=userType;
      //  console.log('image innnnnnd',userType.name)
       if(!auth.uid) return <Redirect to='/signin'/>
       if(uploadedPhoto){
        return (  
          <div className='row'>
            <div className='col-lg-3 col-sm-0'></div>
             <div className='col-lg-6 col-sm-12 ' >
                  <Carousel  autoPlay   responsive={responsive} showArrows={true}   showIndicators={true} showThumbs={false}>
                    {uploadedPhoto.photo&&uploadedPhoto.photo.map((image,i)=>{
                    return ( 
                  
                      <img class="img-fluid" src={image} alt="Colorlib Template"/>
                  
                    )
                    })}
                 </Carousel>
               <div  className="d-flex flex-fill">
                   <Link to={'/comment/'+imageId} className="px-5 flex-fill font-weight-bold">
                     <ImageFormatter src={likesIcon} alt="comment"/>like
                   </Link>
                   <Link to={'/comment/'+imageId} className="px-5 flex-fill font-weight-bold text-dark">
                     <ImageFormatter src={commentIcon} alt="comment" />comment
                   </Link>
                   <Link  to={'/chat/'+imageId} className="px-5 flex-fill font-weight-bold text-dark">
                      <ImageFormatter src={messageIcon} alt="comment" /> send message
                   </Link>
               </div>
               <div className="App">
            <Messages auth={auth.uid} messages={chatMessage} displayedImageId={imageId} productOwner={uploadedPhoto.authId} />
                  {/* <h1>ffffffffffffff{profile.uId}</h1> */}
            <Input profile={profile.userType} imageId={ imageId}  auth={auth.uid} productOwner={uploadedPhoto.authId}/>
          </div>
        </div>
             <div className='col-lg-3 col-sm-0'></div>
           </div>
              );}
          else {
           return (
             <div className="container center">
               <p>Loading photos...</p>
             </div>
           )
         } 
      }
}
 
const mapStateToProps=(state,ownProps)=>{
  console.log('chat app state',state)
  // to get user type
  const uId=state.firebase.auth.uid;
  // console.log("userid",uId);
  const users=state.firestore.data.users;
  // console.log('users',users);
  const userType=users?users[uId]:null;
  // console.log('usertype',userType);
  // to get image id
  const id=ownProps.match.params.id;
  const uPhoto=state.firestore.data.sellerUpload;
  const UPhoto=uPhoto?uPhoto[id]:null;
  // console.log('UPhoto',UPhoto);
  return{
    userType:userType,
    imageId:id,
    uploadedPhoto:UPhoto,
    auth:state.firebase.auth,
    chatMessage:state.firestore.ordered.chat,
    profile:state.firebase.profile,
  }
} 
export default compose(
  connect(mapStateToProps),
 firestoreConnect([
    {collection:'sellerUpload'},
    {collection:'users'},
    {collection:'chat' ,orderBy: ['createdAt','asc']}
 ]))(App);
