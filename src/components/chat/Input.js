import {Component} from "react";
import React from "react";
import {connect } from 'react-redux'
import {addChatMessage} from '../../store/actions/chatAction'
import Send from '../img/play.png'
import Attach from '../img/attach.png'
import styled from 'styled-components';
const Form = styled.form`
display: flex !important;  
`;
const Button=styled.button`
background-color: #49b84c;
border:0;
`;
class Input extends Component {
  state = { 
          text: "",
          sender:'',
          userType:'',
          reciever:'',
          imageId:'' 
 }
  onChange(e) {
    this.setState({
      reciever:this.props.productOwner,
      text: e.target.value,
      userType:this.props.profile,
      imageId:this.props.imageId ,
      sender:this.props.auth
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.addChatMessage(this.state)
    this.setState({text: ""});
  }
  render() {
    // console.log('sender',this.state.sender)
    // console.log('imageId',this.state.imageId)
    // console.log('profile from inpurt',this.state. userType)
    // console.log('reciever from inpurt',this.state. reciever)
    return (
      <div className=" p-3 " style={{backgroundColor: '#49B84C'}}>
        <Form onSubmit={e => this.onSubmit(e)} className="py-0">
        <img src={Attach} height={40}/>
          <input
              style={{
                backgroundColor: 'lightgreen',
              }}
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Type your message...."
            className="form-control commendandchatinput"
            autofocus="true"
 
          />
          <Button> <img src={Send} height={40} /></Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
      addChatMessage:(message)=>dispatch(addChatMessage(message))
  }
}
export default connect(null,mapDispatchToProps)(Input);