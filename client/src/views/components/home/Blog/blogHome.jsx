import React from "react";
import { Link } from 'react-router-dom';
import './blogHome.css';

import blog1 from "../../../../assets/images/blog1.jpg"
import blog2 from "../../../../assets/images/blog2.jpg"
import blog3 from "../../../../assets/images/blog3.jpg"

const BlogHome = () => {
    return (
        <>
            <section id="latest-blog" className="my-5">
                <div className="container py-5 my-5">
                    <div className="row mt-5">
                        <div className="section-header d-md-flex justify-content-between align-items-center mb-3">
                            <h2 className="display-3 fw-normal">Latest Blog Post</h2>
                            <div>
                                <Link to="#" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1" style={{ textDecoration: 'none' }}>
                                    Read all
                                    <svg width="24" height="24" viewBox="0 0 24 24" className="mb-1">
                                        <use xlinkHref="#arrow-right"></use>
                                    </svg></Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 my-4 my-md-0">
                            <div className="card blog-card-custom">
                                <div className="blog-img-wrapper position-relative">
                                    <div className="blog-date-box rounded-3 bg-light">
                                        <h3 className="secondary-font text-primary m-0">20</h3>
                                        <p className="secondary-font fs-6 m-0">Feb</p>
                                    </div>
                                    <Link to="/single-post" style={{ textDecoration: 'none' }}><img src={blog1} className="img-fluid rounded-4" alt="image" /></Link>
                                </div>
                                <div className="card-body p-0">
                                    <Link to="/single-post" style={{ textDecoration: 'none' }}>
                                        <h3 className="card-title pt-4 pb-3 m-0">10 Reasons to be helpful towards any animals</h3>
                                    </Link>
                                    <div className="card-text">
                                        <p className="blog-paragraph fs-6">At the core of our practice is the idea that cities are the incubators of our greatest achievements, and the best hope for a sustainable future.</p>
                                        <Link to="/single-post" className="blog-read" style={{ textDecoration: 'none' }}>read more</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 my-4 my-md-0">
                            <div className="card blog-card-custom">
                                <div className="blog-img-wrapper position-relative">
                                    <div className="blog-date-box rounded-3 bg-light">
                                        <h3 className="secondary-font text-primary m-0">21</h3>
                                        <p className="secondary-font fs-6 m-0">Feb</p>
                                    </div>
                                    <Link to="/single-post" style={{ textDecoration: 'none' }}><img src={blog2} className="img-fluid rounded-4" alt="image" /></Link>
                                </div>
                                <div className="card-body p-0">
                                    <Link to="/single-post" style={{ textDecoration: 'none' }}>
                                        <h3 className="card-title pt-4 pb-3 m-0">How to know your pet is hungry</h3>
                                    </Link>
                                    <div className="card-text">
                                        <p className="blog-paragraph fs-6">At the core of our practice is the idea that cities are the incubators of our greatest achievements, and the best hope for a sustainable future.</p>
                                        <Link to="/single-post" className="blog-read" style={{ textDecoration: 'none' }}>read more</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 my-4 my-md-0">
                            <div className="card blog-card-custom">
                                <div className="blog-img-wrapper position-relative">
                                    <div className="blog-date-box rounded-3 bg-light">
                                        <h3 className="secondary-font text-primary m-0">22</h3>
                                        <p className="secondary-font fs-6 m-0">Feb</p>
                                    </div>
                                    <Link to="/single-post" style={{ textDecoration: 'none' }}><img src={blog3} className="img-fluid rounded-4" alt="image" /></Link>
                                </div>
                                <div className="card-body p-0">
                                    <Link to="/single-post" style={{ textDecoration: 'none' }}>
                                        <h3 className="card-title pt-4 pb-3 m-0">Best home for your pets</h3>
                                    </Link>
                                    <div className="card-text">
                                        <p className="blog-paragraph fs-6">At the core of our practice is the idea that cities are the incubators of our greatest achievements, and the best hope for a sustainable future.</p>
                                        <Link to="/single-post" className="blog-read" style={{ textDecoration: 'none' }}>read more</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BlogHome