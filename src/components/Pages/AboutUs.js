import React, { Component } from 'react'
import about from '../../images/about.jpg';
import bg_3 from '../../images/bg_3.jpg';
export default function AboutUs() {
    return (
            <div>         
<section class="ftco-section ftco-no-pb ftco-no-pt bg-light">
<div class="container">
<div class="row">
<div class="col-md-5 p-md-5 img img-2 d-flex justify-content-center align-items-center" style ={{ backgroundImage:`url(${about})`}}>
<a href="https://vimeo.com/45830194" class="icon popup-vimeo d-flex justify-content-center align-items-center">
<span class="icon-play"></span>
</a>
</div>
<div class="col-md-7 py-5 wrap-about pb-md-5 ftco-animate">
<div class="heading-section-bold mb-4 mt-md-5">
<div class="ml-md-0">
<h2 class="mb-4">Welcome to Sokonileo an eCommerce website </h2>
</div>
</div>
<div class="pb-md-5">
<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
<p>we connect sellers AND buyers HERE </p>
<p><a href="#" class="btn btn-primary">Register now</a></p>
</div>
</div>
</div>
</div>
 </section>
 <section class="ftco-section ftco-no-pt ftco-no-pb py-5 bg-light">
<div class="container py-4">
<div class="row d-flex justify-content-center py-5">
<div class="col-md-6">
<h2 style={{fontSize:'22px'}} class="mb-0">Subcribe to our Newsletter</h2>
<span>Get e-mail updates about our latest Sellers and special offers</span>
</div>
<div class="col-md-6 d-flex align-items-center">
<form action="#" class="subscribe-form">
<div class="form-group d-flex">
<input type="text" class="form-control" placeholder="Enter email address"/>
<input type="submit" value="Subscribe" class="submit px-3"/>
</div>
</form>
</div>
</div>
</div>
</section>
<section class="ftco-section ftco-counter img" id="section-counter" style ={{ backgroundImage:`url(${bg_3})`}}>
<div class="container">
<div class="row justify-content-center py-5">
<div class="col-md-10">
<div class="row">
<div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
<div class="block-18 text-center">
<div class="text">
<strong class="number" data-number="10000">0</strong>
<span>Happy Customers</span>
</div>
</div>
</div>
<div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
<div class="block-18 text-center">
<div class="text">
<strong class="number" data-number="100">0</strong>
<span>Branches</span>
</div>
</div>
</div>
<div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
<div class="block-18 text-center">
<div class="text">
<strong class="number" data-number="1000">0</strong>
<span>Partner</span>
</div>
</div>
</div>
<div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
<div class="block-18 text-center">
<div class="text">
<strong class="number" data-number="100">0</strong>
<span>Awards</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
        </div>
    )
}
