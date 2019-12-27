import React, { Component } from 'react'
import Carousel from "react-multi-carousel";
import bg_1 from '../../images/bg_1.jpg';

import './Products.css';
import {connect} from 'react-redux';

import {ProductSearch} from '../../store/actions/ProductSearchAction'
import {compose} from 'redux'

import{Redirect} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
// const {seller}=this.props
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
  
class ProfileBuyer extends Component {
  state={
    search:'',
    location:'',
    value:[],
    list:''
  }
 
  render() {
    const { authError,auth,profile } = this.props;
   
    
    
    console.log('this is it',(this.state.list===''))    
    if(!auth.uid) return<Redirect to='/'/>
    
    return (
      <div>
        {profile.name}
 </div>
    )
  }
}
const mapStateToProps=(state,ownProps)=>{
  console.log("ma",state)
  const id=ownProps.match.params.id;
  console.log(id)
  return {
    authError: state.auth.authError,
    auth:state.firebase.auth,
    profile:state.firebase.profile
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    ProductSearch:(searchvalue)=>dispatch(ProductSearch(searchvalue))
  }
}
export default compose(connect(mapStateToProps,mapDispatchToProps),  firestoreConnect([
  {collection:'sellerUpload',orderedBy:['time','desc']},
  {collection:'sellerLocation',orderedBy:['time','desc']},
]))(ProfileBuyer);







