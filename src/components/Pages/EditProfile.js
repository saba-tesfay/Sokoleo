import React, { Component } from 'react'
import {editProfile} from '../../store/actions/editProfileAction';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {Input} from 'antd'

import 'antd/dist/antd.css';
import fbConfig from'../../config/fbConfig';
import { Avatar, Typography, Button, Col } from 'antd';
const { Title } = Typography;
class EditProfile extends Component {
    state={
        name:'',
        PhoneNum:'',
        AlternateNum:'',
        photo:[],
        password:'',
        confirmPassword:'',
        passwordError:'',
        flag:'black'
      }
    
    handelChange=(e)=>{
      this.setState({
        [e.target.id]:e.target.value,
        })
     }
 handleSubmit=(e)=>{
        if (this.file.files.length>1) {
      
          alert("Please select only one photo");
          return
        }
        
      e.preventDefault();
      
      
      if(this.state.name===''){
        this.setState({
          name:this.props.profile.name
        })
        console.log(this.props.profile.name.length,'my name')
      }
      if(this.state.PhoneNum===''){
        this.setState({
          PhoneNum:this.props.profile.password
        })
      }
      if(this.state.AlternateNum===''){
        this.setState({
          AlternateNum:this.props.profile.AlternateNum
        })
      }
      if(this.state.password!==this.state.confirmPassword){
        console.log('password error')
        this.setState({
          passwordError:'password mismatch'
        })
        return
     }
     if(this.state.password.length<6&&this.state.password.length!==0){
       console.log('password error')
       this.setState({
         passwordError:'Password Too Short'
       })
       return
    }
      
      const storageRef=fbConfig.storage().ref();
      if(this.file.files.length>0)
      {this.setState({
        flag:'red'
      })}
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
  this.props.editProfile(this.state)
       console.log("upload",this.state)
      }

      setRef=ref=>{
          this.file=ref
         }
   render() {
    if(!this.props.auth.uid) return<Redirect to='/'/>
    const styles = {
        color:'#000',
        fontFamily:'poppins,Arial,sans-serif',
        lineHeight:'1.5', 
        fontweight:'30',
        fontSize:'18px'

      }
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
    <Title style={{ fontSize: '14px', margin: '10px 0' }}></Title>   
    <div class="col-sm-6 " >
                          <div class="form-group" style={{position: 'relative',  overflow:' hidden', display: 'inline-block'}}>
                          <button type="button" class='btn btn-primary px-4' style={{backgroundColor:'gray',cursor:'pointer',color:'white'}}>Browse Photo</button>
     
                          
                          <input type="file" ref={this.setRef} multiple   accept="image/*"
                          style={{position:"absolute",left:'0',top:'0', opacity:'0',borderRadius:'10px'}}/>
                      </div>
      </div>
      <div class="col-sm-6 ">
      {this.state.flag!=='green'?<>{this.state.flag==='black'?<button type="button" onClick={this.handleSubmit} class="btn btn-primary px-4 float-right">Upload</button>:<lable class="px-4 py-2 float-right" style={{borderRadius:'20px',backgroundColor:'#82ae46'}}>Uploading</lable>}</>:
    <lable class="px-4 py-2 float-right" style={{borderRadius:'20px',backgroundColor:'#82ae46'}}>Uploaded</lable>}</div>
    </Col>
    
             <div class="form-group row">
                <div class="col-sm-6">
                        <label for="inputbusinessname" style={styles}>Name</label>
                        <input type="text"  onChange={this.handelChange} class="form-control" id="name" defaultValue={this.props.profile.name}/>
                    </div>
                    <div class="col-sm-6">
                        <label for="inputmarketName" style={styles}>Phone number</label>
                        <input type="text" onChange={this.handelChange}  class="form-control" id="PhoneNum" defaultValue={this.props.profile.PhoneNum}/>
                    </div>
    
                </div>
                <div class="form-group row" style={styles}>
                    <div class="col-sm-6">
                        <label for="inputContactperson">Alternative Phone number </label>
                        <input type="text" onChange={this.handelChange} class="form-control" id="AlternateNum" defaultValue={this.props.profile.AlternateNum}/>
                    </div>
                    <div class="col-sm-6">
                        <label for="inputmarketName" style={styles}>New Password</label>
                        <Input.Password id="password"  className="psw-input" placeholder="Password" onChange={this.handelChange} required/>
                        </div>
                    
                    </div>
                <div class="form-group row">
                <div class="col-sm-6">
                        {/* <label for="inputbusinessname" style={styles}>Email</label>
                        <input type="text"  onChange={this.handelChange} class="form-control" id="email" placeholder="Email"/> */}
                    </div>
                    <div class="col-sm-6">
                        <label for="inputmarketName" style={styles}>Password</label>
                        <Input.Password id="confirmPassword"  className="psw-input" placeholder="Confirm Password" onChange={this.handelChange} required/>
                        <div style={{fontSize:'18px',color:'red'}}>
                {this.state.passwordError}
                </div>
                        </div>
                  
    
                </div>
                
                
             
                <button type="button" onClick={this.handleSubmit}class="btn btn-primary px-4 float-right">Save</button>
            </form>
        </div>
    </div>
</div>
</section>
                    </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
      auth:state.firebase.auth,
      profile:state.firebase.profile,
      seller:state.firestore.data.sellerUpload,
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return{
      
        editProfile:(newUser)=>dispatch(editProfile(newUser))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(EditProfile);
