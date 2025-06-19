import React from "react";

import insta1 from "../../../../assets/images/insta1.jpg"
import insta2 from "../../../../assets/images/insta2.jpg"
import insta3 from "../../../../assets/images/insta3.jpg"
import insta4 from "../../../../assets/images/insta4.jpg"
import insta5 from "../../../../assets/images/insta5.jpg"
import insta6 from "../../../../assets/images/insta6.jpg"
import './serviceHome.css';

const ServiceHome = () => {
    return (
        <>
            <section id="service">
                <div className="container py-5 my-5">
                    <div className="row g-md-5 pt-4">
                        <div className="col-md-3 my-3">
                            <div className="card">
                                <div>
                                    <iconify-icon className="service-icon text-primary" icon="la:shopping-cart"></iconify-icon>
                                </div>
                                <h3 className="card-title py-2 m-0">Free Delivery</h3>
                                <div className="card-text">
                                    <p className="blog-paragraph fs-6">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 my-3">
                            <div className="card">
                                <div>
                                    <iconify-icon className="service-icon text-primary" icon="la:user-check"></iconify-icon>
                                </div>
                                <h3 className="card-title py-2 m-0">100% secure payment</h3>
                                <div className="card-text">
                                    <p className="blog-paragraph fs-6">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 my-3">
                            <div className="card">
                                <div>
                                    <iconify-icon className="service-icon text-primary" icon="la:tag"></iconify-icon>
                                </div>
                                <h3 className="card-title py-2 m-0">Daily Offer</h3>
                                <div className="card-text">
                                    <p className="blog-paragraph fs-6">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 my-3">
                            <div className="card">
                                <div>
                                    <iconify-icon className="service-icon text-primary" icon="la:award"></iconify-icon>
                                </div>
                                <h3 className="card-title py-2 m-0">Quality guarantee</h3>
                                <div className="card-text">
                                    <p className="blog-paragraph fs-6">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section id="insta" className="my-5">
                <div className="row g-0 py-5">
                    <div className="col instagram-item  text-center position-relative">
                        <div className="icon-overlay d-flex justify-content-center position-absolute">
                            <iconify-icon className="text-white" icon="la:instagram"></iconify-icon>
                        </div>
                        <a href="#">
                            <img src={insta1} alt="insta-img" className="img-fluid rounded-3"/>
                        </a>
                    </div>
                    <div className="col instagram-item  text-center position-relative">
                        <div className="icon-overlay d-flex justify-content-center position-absolute">
                            <iconify-icon className="text-white" icon="la:instagram"></iconify-icon>
                        </div>
                        <a href="#">
                            <img src={insta2} alt="insta-img" className="img-fluid rounded-3"/>
                        </a>
                    </div>
                    <div className="col instagram-item  text-center position-relative">
                        <div className="icon-overlay d-flex justify-content-center position-absolute">
                            <iconify-icon className="text-white" icon="la:instagram"></iconify-icon>
                        </div>
                        <a href="#">
                            <img src={insta3} alt="insta-img" className="img-fluid rounded-3"/>
                        </a>
                    </div>
                    <div className="col instagram-item  text-center position-relative">
                        <div className="icon-overlay d-flex justify-content-center position-absolute">
                            <iconify-icon className="text-white" icon="la:instagram"></iconify-icon>
                        </div>
                        <a href="#">
                            <img src={insta4} alt="insta-img" className="img-fluid rounded-3"/>
                        </a>
                    </div>
                    <div className="col instagram-item  text-center position-relative">
                        <div className="icon-overlay d-flex justify-content-center position-absolute">
                            <iconify-icon className="text-white" icon="la:instagram"></iconify-icon>
                        </div>
                        <a href="#">
                            <img src={insta5} alt="insta-img" className="img-fluid rounded-3"/>
                        </a>
                    </div>
                    <div className="col instagram-item  text-center position-relative">
                        <div className="icon-overlay d-flex justify-content-center position-absolute">
                            <iconify-icon className="text-white" icon="la:instagram"></iconify-icon>
                        </div>
                        <a href="#">
                            <img src={insta6} alt="insta-img" className="img-fluid rounded-3"/>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ServiceHome