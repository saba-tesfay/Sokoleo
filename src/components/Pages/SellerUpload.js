import React, { Component } from 'react'
import {connect} from 'react-redux';
import fbConfig from'../../config/fbConfig';
import MapSeller from './MapSeller';
import {sellerupload} from '../../store/actions/SellerUploadAction';
import { withScriptjs, withGoogleMap, GoogleMap, Circle,Marker } from "react-google-maps";
import {Redirect} from 'react-router-dom'
const Map = withScriptjs(
  withGoogleMap(props => (
      <GoogleMap
          defaultZoom={12}
          defaultCenter={{lat: -0.023559, lng: 37.90619300000003}}
          onClick={e => props.onMapClick(e)}
      >
       {console.log("belew",props.marks)}
          {props.marks.map((mark, index) => <Marker key={index} 
    
          // position={mark}
          position={{ lat: mark.lat(),  lng: mark.lng() }}
          // position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
        
           />)}
          {/* <Autocomplete
             style={{
              width: '50%',
              height: '40px',
              paddingLeft: '16px',
              marginTop: '10px',
              marginBottom: '100px'
             }}
            
          //    onPlaceSelected={ this.onPlaceSelected }
             types={['(regions)']}
            /> */}
      </GoogleMap>
  ))
);


class SellerUpload extends Component {
    state={
        businessName:'',
        marketName:'',
        price:'',
        catagory:'',
        PhoneNumber:'',
        photo:[],
        lat:'',
        lng:'',
        discription:'',
        flag:'black'
      }
    
    handelChange=(e)=>{

        this.setState({
        [e.target.id]:e.target.value,
        })
   console.log(this.state.file)
 }

      handleSubmit=(e)=>{
        if (this.file.files.length>4) {
      
            alert("Please select maximum of 4 photos");
            return
          }
          this.setState({
              flag:'red'
          })
      e.preventDefault();
      const storageRef=fbConfig.storage().ref();
      for (var i =0 ; i <this.file.files.length; i++) {
          const file=this.file.files[i]
      const mainimage=storageRef.child(this.file.files[i].name)
      mainimage.put(file).then((snapshot)=>{
          mainimage.getDownloadURL().then((url)=>{
            let photos=this.state.photo
            photos.push(url)
              this.setState({
               photo:photos,
               flag:'green'
              })
          })
         
      })
      }
      console.log(this.state)
      
      //  this.props.history.push('/')
       console.log("upload",this.state)
      }
 
      setRef=ref=>{
          this.file=ref
          
      }
    render() {
        const {auth,profile}=this.props
        const {seller}=this.props
        if(profile.userType==='Buyer') return <Redirect to='/'/>
        if(!auth.uid) return<Redirect to='/'/>
          const styles = {
              color:'#000',
              fontFamily:'poppins,Arial,sans-serif',
              lineHeight:'1.5', 
              fontweight:'30',
              fontSize:'18px'
      
            }
            console.log(this.state.photo)
            return (
           <div>
           <section class="ftco-section contact-section bg-light">
      <div class="container py-5">
      
          <div class="row ">
         <div class="col-md-10 mx-auto bg-white" >
         <h2 style={styles}  class='pb-2 pt-4 text-center'>Add your Products</h2>
         <form class="p-5">

<div class="form-group row">
   <div class="col-sm-6">
           <label for="inputbusinessname" style={styles}>Name of Products</label>
           <input type="text"  onChange={this.handelChange} class="form-control" id="businessName" placeholder="Name of your Business" required/>
       </div>
       <div class="col-sm-6">
           <label for="inputPhoneNumber" style={styles}>Phone number</label>
           <input type="text" onChange={this.handelChange}  class="form-control" id="PhoneNumber" placeholder="PhoneNumber" required/>
       </div>

   </div>
   <div class="form-group row">
   <div class="col-sm-6">
           <label for="inputbusinessname" style={styles}>catagory</label>
           <input type="text"  onChange={this.handelChange} class="form-control" id="catagory" placeholder="Catagory of business" required/>
       </div>
       <div class="col-sm-6">
                          <div class="form-group" style={{position: 'relative',  overflow:' hidden', display: 'inline-block'}}>
                          <button class=" bg-grey"><i style={{fontSize:'170%',fontWeight:'40',color:this.state.flag}}
                                          class="ion-md-arrow-up"></i>Add photos</button>
                          
                          <input type="file" ref={this.setRef} multiple   accept="image/*"
                          style={{position:"absolute",left:'0',top:'0', opacity:'0',borderRadius:'10px'}}/>
                      </div>
                      </div>
        
   </div>
   <div style={{marginRight:'40px'}}>

                      {this.state.flag!=='green'?<>{this.state.flag==='black'?<button type="button" onClick={this.handleSubmit} class="btn btn-primary px-4 ">Upload</button>:<lable class="px-4" style={{borderRadius:'20px',backgroundColor:'#82ae46'}}>Uploading</lable>}</>:
    <lable class="px-4" style={{borderRadius:'20px',backgroundColor:'#82ae46'}}>Uploaded</lable>}
    </div>
   <div class="form-group row" style={styles}>
       <div class="col-sm-6">
           <label for="inputDiscription">Discription</label>
           <input type="text" onChange={this.handelChange} class="form-control" id="discription" placeholder="discription" required/>
       </div>
       <div class="col-sm-6" >
                
             </div>
       </div>
   <div class="form-group row" style={styles}>
       <div class="col-sm-6">
           <label for="inputPrice">Price </label>
           <input type="text" onChange={this.handelChange} class="form-control" id="price" placeholder="Range of Price" required/>
       </div>
       <div class="col-sm-6">
           <label for="inputPrice">Market Name </label>
           <input type="text" onChange={this.handelChange} class="form-control" id="marketName" placeholder="Name of the markt located" required/>
       </div>
   </div>

</form>
                  <div class="row "  >
                  <div class="col-md-10 mx-auto " >
                            <h3>Set Location</h3>
                            <MapSeller seller={seller}
                                       sellerInfo={this.state}/>
                          </div>
                          </div>
              </div>
              
      
         
          
      </div>
      </div>
 </section>
 
 </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
      auth:state.firebase.auth,
      seller:state.firestore.data.sellerUpload,
      profile:state.firebase.profile
    }
  }
const mapDispatchToProps=(dispatch)=>{
 
      return {
        sellerupload :(uploads)=>dispatch(sellerupload(uploads))
      }
  }
export default connect(mapStateToProps,mapDispatchToProps)(SellerUpload);
