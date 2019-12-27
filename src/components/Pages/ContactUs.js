import React from 'react'
import {connect} from 'react-redux';
import {listProducts} from'../../store/actions/productActions';
import {ProductSearch} from '../../store/actions/ProductSearchAction'
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
function ContactUs(props) {
    const {sellerUpload}=props;
    console.log("ddddddddddd",props)
    return (
      
        <div>
<section class="ftco-section contact-section bg-light">
<div class="container">
<div class="row d-flex mb-5 contact-info">
<div class="w-100"></div>
<div class="col-md-3 d-flex">
<div class="info bg-white p-4">
<p><span>:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
</div>
</div>
<div class="col-md-3 d-flex">
<div class="info bg-white p-4">
<p><span>:</span> <a href="tel://1234567920">+ 1235 2355 98</a></p>
</div>
</div>
<div class="col-md-3 d-flex">
<div class="info bg-white p-4">
<p><span>Email:</span> <a href="/cdn-cgi/l/email-protection#7e171018113e07110b0c0d170a1b501d1113"><span class="__cf_email__" data-cfemail="ef86818980af96809a9d9c869b8ac18c8082">[email&#160;protected]</span></a></p>
</div>
</div>
<div class="col-md-3 d-flex">
<div class="info bg-white p-4">
<p><span>Website</span> <a href="#">yoursite.com</a></p>
</div>
</div>
</div>
<div class="row block-9">
<div class="col-md-6 order-md-last d-flex">
<form action="#" class="bg-white p-5 contact-form">
<div class="form-group">
<input type="text" class="form-control" placeholder="Your Name"/>
</div>
<div class="form-group">
<input type="text" class="form-control" placeholder="Your Email"/>
</div>
<div class="form-group">
<input type="text" class="form-control" placeholder="Subject"/>
</div>
<div class="form-group">
<textarea name="" id="" cols="30" rows="7" class="form-control" placeholder="Message"/>
</div>
<div class="form-group">
<input type="submit" value="Send Message" class="btn btn-primary py-3 px-5"/>
</div>
</form>
</div>
<div class="col-md-6 d-flex">
<div id="map" class="bg-white"></div>
</div>
</div>
</div>
</section>
        </div>
    )
}
const mapStateToProps=(state,ownProps)=>{
    console.log("prod",state);
    const id=ownProps.match.params.id;
    const  sellerDetails=state.firestore.data.sellerUpload
  const sellerDetail=sellerDetails ? sellerDetails[id]:null
    return {
      sellerDetails:sellerDetail
    }
  }
  export default compose(connect(mapStateToProps),  firestoreConnect([
    {collection:'sellerUpload'}
  ]))(ContactUs);