import React, { Component } from "react";
import {connect } from 'react-redux';
import Send from '../img/play.png'
import {addComment} from '../../store/actions/addComment'
import Attach from '../img/attach.png'
import styled from 'styled-components';
 const Form = styled.form`
display: flex !important;  
`;
const Button=styled.button`
background-color: #49b84c;
border:0;
`;
 class CommentForm extends Component {
   state = {
      comment:'',
      FristName:'',
      imageId:''
        };
/**
   * Handle form input field changes & update the state
   */
  handleFieldChange = (event) => {
    this.setState({comment:event.target.value,
    imageId:this.props.imageId })    
  };
  onSubmit=(event)=>{
    // prevent default form submission
    event.preventDefault();
    this.props.addComment(this.state);
    this.setState({comment:''});
    
  }
  render() {
    console.log('imageid from comment form',this.props.imageId)
    return (
    <div className="Input pt-3 pl-4" style={{backgroundColor: '#49B84C'}}>
        <Form method="post Input" onSubmit={this.onSubmit}>
          <img src={Attach} height={40}/>
          <input
            style={{
              backgroundColor: 'lightgreen',
              
            }}
            onChange={this.handleFieldChange}
              id="comment"
              name='comment'
              className="form-control commendandchatinput"
              placeholder="Your Comment"
              value={this.state.comment}
          />
              <Button type="submit"> <img src={Send} height={40} /></Button>
        </Form>
      </div>
    );
  }
  }
  const mapDispatchToProps=(dispatch)=>{
    return{
        addComment:(comment)=>dispatch(addComment(comment))
    }
  }
 export default connect(null,mapDispatchToProps)(CommentForm);