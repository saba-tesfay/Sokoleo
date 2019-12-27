import React, { Component } from 'react'
import bg_1 from '../../images/bg_1.jpg';
import ListProducts from './ListProducts';
import './Products.css';
import {connect} from 'react-redux';
import {compose} from 'redux'
import{Redirect} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { GoogleComponent } from 'react-google-location' 
import Geocode from "react-geocode";

 
 


Geocode.setApiKey('AIzaSyCd5GSrdhkRjDu53HCBVL7fh5QXa1-gIBE');

Geocode.setLanguage("en");
 
Geocode.setRegion("es");

Geocode.enableDebug();

class Products extends Component {
  state={
    search:'',
    location:'',
    value:[],
    place:null,
    northEast:[],
    southWest:[],
    searchedLocation:'',
    searched:'',
    searchedP:'',
    id:''
  }
 
 handelChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value,
      id:e.target.id
    })
     }
     handleSubmit=(e)=>{
  
      e.preventDefault();
      this.setState({
        searchedP:this.state.searched
      })
      console.log(this.state.searched,this.state.searchedLocation,'searched')
      this.search(this.props,this.state.searched,this.state.searchedLocation,this.state.id)
        //  this.props.history.push('/')
         
      }
        search=(props,searchvalue,searchedLocation,id)=>{
        const {seller,location}=props;
            if(seller){
        const works = seller.filter((val)=>{
          if(searchedLocation===''){
            this.setState({
              northEast:[],
              southWest:[]
            })
          }
       
          if(searchedLocation!==''){
            let flag=0
                  console.log(this.props.Market)
                  this.props.Market&&this.props.Market.map((element,index)=>{
                    console.log(element)
                    if(searchvalue===element.MarketName){
                      
                      this.setState({
                        mapPosition:{
                          lat:element.southWast.lat+(element.northEast.lat-element.southWast.lat)/2,
                          lng:element.southWast.lng+(element.northEast.lng-element.southWast.lng)/2
                        },
                        northEast:element.northEast,
                        southWest:element.southWast
                      })
                      flag=1
                      console.log('hello i am true')
                    }
                  })
                    if(flag===0){
            Geocode.fromAddress(searchedLocation).then(
              
              response => {
                const { lat, lng,northeast } = response.results[0].geometry.location;
                console.log("results",lat)
               const r= response.results[0].geometry.bounds.northeast
               const c=response.results[0].geometry.bounds.southwest
                this.setState({
                  northEast:r,
                  southWest:c
                })
              },
              error => {
                console.error("error",error);
              }
            );}
           }
           
           console.log(searchvalue,'hellooojskdfjdjs')  
        if(searchvalue!==''){
         
       return (
         val.catagory.toLowerCase().includes(searchvalue.toLowerCase())
         )}
           

           
        });
        this.setState({
          value:works
        })
      }
      
       }
  render() {
    const { authError,auth,profile } = this.props;
console.log(profile,'my prof')
    const {seller,location}=this.props;
    console.log('here is the loc',location)
        console.log("location",this.state.southWest,this.state.northEast,{location})
    if(!auth.uid) return<Redirect to='/'/>
    if(profile.userType==='seller') return<Redirect to='/profile'/>
    return (
      <div>
<div class="hero-wrap hero-bread"  style ={{ backgroundImage:`url(${bg_1})`}}>
<div class="container">
<div class="row no-gutters slider-text align-items-center justify-content-center">
<div class="col-md-9 text-center">
<p class="breadcrumbs"><span class="mr-2"><a href="/">Home</a></span> <span>Products</span></p>
<h1 class="mb-0 bread">Products</h1>
</div>
</div>
</div>
</div>
<section class="ftco-section">
<div class="container">
<div class="row justify-content-center">
<div class="col-md-10 mb-5 text-center">
<h3 style={{color:'#82ae46',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'400'}}
          >Products</h3>

</div>
</div>
</div>
<form >
<div class="input-group" >
  <input type="text"class="form-control try" id='search'  name='searched'
   onChange ={this.handelChange} placeholder="Search by Catagory" />
  
  <input type="text" class="form-control trys" id='location' name='searchedLocation' onChange ={this.handelChange}  placeholder="By Location"/>

 <button class="search-button" onClick={this.handleSubmit}>Search</button>
</div>
</form>
</section>
    {(this.state.value.length===0 && this.state.searchedP!=='')?<h2 style={{textAlign:'center'}}>Product not found</h2>:<div>{this.state.value.length===0?(<ListProducts seller={seller}
                                                location={location}
                                                southWest={this.state.southWest}
                                                northEast={this.state.northEast}
                                                search={this.state.searched}/>):(<ListProducts seller={this.state.value}
                                                                                                location={location}
                                                                                                southWest={this.state.southWest}
                                                                                                northEast={this.state.northEast}
                                                                                                search={this.state.searched}/>)}</div>}
 </div>
    )
  }
}
const mapStateToProps=(state,ownProps)=>{
  console.log("ma",ownProps)
  const id=ownProps.match.params.id;
  console.log("okay",state)
  return {
    seller:state.firestore.ordered.sellerUpload,
    location:state.firestore.ordered.sellerLocation,
    authError: state.auth.authError,
    auth:state.firebase.auth,
    Market:state.firestore.ordered.setMarket,
    profile:state.firebase.profile
}
}

export default compose(connect(mapStateToProps,null),  firestoreConnect([
  {collection:'sellerUpload',orderedBy:['time','desc']},
  {collection:'sellerLocation',orderedBy:['time','desc']},
  {collection:'setMarket',orderedBy:['time','desc']}
]))(Products);







