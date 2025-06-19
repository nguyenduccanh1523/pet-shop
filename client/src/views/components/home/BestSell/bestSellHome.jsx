import React from "react";
import { Link } from 'react-router-dom';
import item5 from "../../../../assets/images/item5.jpg"
import item6 from "../../../../assets/images/item6.jpg"
import item7 from "../../../../assets/images/item7.jpg"
import item8 from "../../../../assets/images/item8.jpg"
import item3 from "../../../../assets/images/item3.jpg"
import item4 from "../../../../assets/images/item4.jpg"
import './bestSellHome.css';

const BestSellHome = () => {
    return (
        <>
            <section id="bestselling" className="my-5 overflow-hidden">
                <div className="container py-5 mb-5">

                    <div className="section-header d-md-flex justify-content-between align-items-center mb-3">
                        <h2 className="display-3 fw-normal">Best selling products</h2>
                        <div>
                            <a href="#" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1">
                                shop now
                                <svg width="24" height="24" viewBox="0 0 24 24" className="mb-1">
                                    <use xlinkHref="#arrow-right"></use>
                                </svg></a>
                        </div>
                    </div>

                    <div className="swiper bestselling-swiper swiper-initialized swiper-horizontal swiper-backface-hidden">
                        <div className="swiper-wrapper" id="swiper-wrapper-d73d2ab5722b54c8" aria-live="polite">

                            <div className="swiper-slide swiper-slide-active" role="group" aria-label="1 / 6" style={{ width: "301.5px", marginRight: "30px" }}>
                                <div className="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                                    New
                                </div>
                                <div className="card position-relative">
                                    <Link to="/single-product" style={{ textDecoration: 'none' }}><img src={item5} className="img-fluid rounded-4" alt="image" /></Link>
                                    <div className="card-body p-0">
                                        <Link to="/single-product" style={{ textDecoration: 'none' }}>
                                            <h3 className="card-title pt-4 m-0">Grey hoodie</h3>
                                        </Link>

                                        <div className="card-text">
                                            <span className="rating secondary-font">
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                5.0</span>

                                            <h3 className="secondary-font text-primary">$18.00</h3>

                                            <div className="d-flex flex-wrap mt-3">
                                                <a href="#" className="btn-cart me-3 px-4 pt-3 pb-3" style={{ textDecoration: 'none' }}>
                                                    <h5 className="text-uppercase m-0">Add to Cart</h5>
                                                </a>
                                                <a href="#" className="btn-wishlist px-4 pt-3" style={{ textDecoration: 'none' }}>
                                                    <iconify-icon icon="fluent:heart-28-filled" className="fs-5"></iconify-icon>
                                                </a>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide swiper-slide-next" role="group" aria-label="2 / 6" style={{ width: "301.5px", marginRight: "30px" }}>
                                <div className="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                                    New
                                </div>
                                <div className="card position-relative">
                                    <Link to="/single-product" style={{ textDecoration: 'none' }}><img src={item6} className="img-fluid rounded-4" alt="image" /></Link>
                                    <div className="card-body p-0">
                                        <Link to="/single-product" style={{ textDecoration: 'none' }}>
                                            <h3 className="card-title pt-4 m-0">Grey hoodie</h3>
                                        </Link>

                                        <div className="card-text">
                                            <span className="rating secondary-font">
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                5.0</span>

                                            <h3 className="secondary-font text-primary">$18.00</h3>

                                            <div className="d-flex flex-wrap mt-3">
                                                <a href="#" className="btn-cart me-3 px-4 pt-3 pb-3" style={{ textDecoration: 'none' }}>
                                                    <h5 className="text-uppercase m-0">Add to Cart</h5>
                                                </a>
                                                <a href="#" className="btn-wishlist px-4 pt-3" style={{ textDecoration: 'none' }}>
                                                    <iconify-icon icon="fluent:heart-28-filled" className="fs-5"></iconify-icon>
                                                </a>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide" role="group" aria-label="3 / 6" style={{ width: "301.5px", marginRight: "30px" }}>
                                <div className="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                                    Sale
                                </div>
                                <div className="card position-relative">
                                    <Link to="/single-product" style={{ textDecoration: 'none' }}><img src={item7} className="img-fluid rounded-4" alt="image" /></Link>
                                    <div className="card-body p-0">
                                        <Link to="/single-product" style={{ textDecoration: 'none' }}>
                                            <h3 className="card-title pt-4 m-0">Grey hoodie</h3>
                                        </Link>

                                        <div className="card-text">
                                            <span className="rating secondary-font">
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                5.0</span>

                                            <h3 className="secondary-font text-primary">$18.00</h3>

                                            <div className="d-flex flex-wrap mt-3">
                                                <a href="#" className="btn-cart me-3 px-4 pt-3 pb-3" style={{ textDecoration: 'none' }}>
                                                    <h5 className="text-uppercase m-0">Add to Cart</h5>
                                                </a>
                                                <a href="#" className="btn-wishlist px-4 pt-3">
                                                    <iconify-icon icon="fluent:heart-28-filled" className="fs-5"></iconify-icon>
                                                </a>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide" role="group" aria-label="4 / 6" style={{ width: "301.5px", marginRight: "30px" }}>
                                <div className="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                                    New
                                </div>
                                <div className="card position-relative">
                                    <Link to="/single-product" style={{ textDecoration: 'none' }}><img src={item8} className="img-fluid rounded-4" alt="image" /></Link>
                                    <div className="card-body p-0">
                                        <Link to="/single-product" style={{ textDecoration: 'none' }}>
                                            <h3 className="card-title pt-4 m-0">Grey hoodie</h3>
                                        </Link>

                                        <div className="card-text">
                                            <span className="rating secondary-font">
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                5.0</span>

                                            <h3 className="secondary-font text-primary">$18.00</h3>

                                            <div className="d-flex flex-wrap mt-3">
                                                <a href="#" className="btn-cart me-3 px-4 pt-3 pb-3">
                                                    <h5 className="text-uppercase m-0">Add to Cart</h5>
                                                </a>
                                                <a href="#" className="btn-wishlist px-4 pt-3">
                                                    <iconify-icon icon="fluent:heart-28-filled" className="fs-5"></iconify-icon>
                                                </a>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide" role="group" aria-label="5 / 6" style={{ width: "301.5px", marginRight: "30px" }}>
                                <div className="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                                    -10%
                                </div>
                                <div className="card position-relative">
                                    <Link to="/single-product" style={{ textDecoration: 'none' }}><img src={item3} className="img-fluid rounded-4" alt="image" /></Link>
                                    <div className="card-body p-0">
                                        <Link to="/single-product" style={{ textDecoration: 'none' }}>
                                            <h3 className="card-title pt-4 m-0">Grey hoodie</h3>
                                        </Link>

                                        <div className="card-text">
                                            <span className="rating secondary-font">
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                5.0</span>

                                            <h3 className="secondary-font text-primary">$18.00</h3>

                                            <div className="d-flex flex-wrap mt-3">
                                                <a href="#" className="btn-cart me-3 px-4 pt-3 pb-3" style={{ textDecoration: 'none' }}>
                                                    <h5 className="text-uppercase m-0">Add to Cart</h5>
                                                </a>
                                                <a href="#" className="btn-wishlist px-4 pt-3">
                                                    <iconify-icon icon="fluent:heart-28-filled" className="fs-5"></iconify-icon>
                                                </a>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide" role="group" aria-label="6 / 6" style={{ width: "301.5px", marginRight: "30px" }}>
                                <div className="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                                    New
                                </div>
                                <div className="card position-relative">
                                    <Link to="/single-product" style={{ textDecoration: 'none' }}><img src={item4} className="img-fluid rounded-4" alt="image" /></Link>
                                    <div className="card-body p-0">
                                        <Link to="/single-product" style={{ textDecoration: 'none' }}>
                                            <h3 className="card-title pt-4 m-0">Grey hoodie</h3>
                                        </Link>

                                        <div className="card-text">
                                            <span className="rating secondary-font">
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                5.0</span>

                                            <h3 className="secondary-font text-primary">$18.00</h3>

                                            <div className="d-flex flex-wrap mt-3">
                                                <a href="#" className="btn-cart me-3 px-4 pt-3 pb-3" style={{ textDecoration: 'none' }}>
                                                    <h5 className="text-uppercase m-0">Add to Cart</h5>
                                                </a>
                                                <a href="#" className="btn-wishlist px-4 pt-3">
                                                    <iconify-icon icon="fluent:heart-28-filled" className="fs-5"></iconify-icon>
                                                </a>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>
                        <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>


                </div>
            </section>
        </>
    )
}

export default BestSellHome