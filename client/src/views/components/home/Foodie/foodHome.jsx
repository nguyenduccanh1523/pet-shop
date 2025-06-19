import React from "react";
import './foodHome.css';
import { Link } from 'react-router-dom';

import item9 from "../../../../assets/images/item9.jpg"
import item10 from "../../../../assets/images/item10.jpg"
import item11 from "../../../../assets/images/item11.jpg"
import item12 from "../../../../assets/images/item12.jpg"
import item13 from "../../../../assets/images/item13.jpg"
import item14 from "../../../../assets/images/item14.jpg"
import item15 from "../../../../assets/images/item15.jpg"
import item16 from "../../../../assets/images/item16.jpg"

const FoodHome = () => {
    return (
        <>
            <section id="foodies" className="my-5">
                <div className="container my-5 py-5">

                    <div className="section-header d-md-flex justify-content-between align-items-center">
                        <h2 className="display-3 fw-normal">Pet Foodies</h2>
                        <div className="mb-4 mb-md-0">
                            <p className="m-0">
                                <button className="filter-button me-4 active" data-filter="*">ALL</button>
                                <button className="filter-button me-4" data-filter=".cat">CAT</button>
                                <button className="filter-button me-4" data-filter=".dog">DOG</button>
                                <button className="filter-button me-4" data-filter=".bird">BIRD</button>
                            </p>
                        </div>
                        <div>
                            <a href="#" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1">
                                shop now
                                <svg width="24" height="24" viewBox="0 0 24 24" className="mb-1">
                                    <use xlinkHref="#arrow-right"></use>
                                </svg></a>
                        </div>
                    </div>

                    <div className="isotope-container row" style={{ position: "relative", height: "1053.06px" }}>

                        <div className="item cat col-md-4 col-lg-3 my-4" style={{ position: "absolute", left: "0px", top: "0px" }}>
                            <div className="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                                New
                            </div>
                            <div className="card position-relative">
                                <Link to="/single-product" style={{ textDecoration: 'none' }}><img src={item9} className="img-fluid rounded-4" alt="image" /></Link>
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

                        <div className="item dog col-md-4 col-lg-3 my-4" style={{ position: "absolute", left: "330px", top: "0px" }}>
                            <div className="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                                New
                            </div>
                            <div className="card position-relative">
                                <Link to="/single-product" style={{ textDecoration: 'none' }}><img src={item10} className="img-fluid rounded-4" alt="image" /></Link>
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

                        <div className="item dog col-md-4 col-lg-3 my-4" style={{ position: "absolute", left: "660px", top: "0px" }}>
                            <div className="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                                New
                            </div>
                            <div className="card position-relative">
                                <Link to="/single-product" style={{ textDecoration: 'none' }}><img src={item11} className="img-fluid rounded-4" alt="image" /></Link>
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

                        <div className="item cat col-md-4 col-lg-3 my-4" style={{ position: "absolute", left: "990px", top: "0px" }}>
                            <div className="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                                Sold
                            </div>
                            <div className="card position-relative">
                                <Link to="/single-product" style={{ textDecoration: 'none' }}><img src={item12} className="img-fluid rounded-4" alt="image" /></Link>
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

                        <div className="item bird col-md-4 col-lg-3 my-4" style={{ position: "absolute", left: "0px", top: "526.531px" }}>
                            <div className="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                                New
                            </div>
                            <div className="card position-relative">
                                <Link to="/single-product" style={{ textDecoration: 'none' }}><img src={item13} className="img-fluid rounded-4" alt="image" /></Link>
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

                        <div className="item bird col-md-4 col-lg-3 my-4" style={{ position: "absolute", left: "330px", top: "526.531px" }}>
                            <div className="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                                New
                            </div>
                            <div className="card position-relative">
                                <Link to="/single-product" style={{ textDecoration: 'none' }}><img src={item14} className="img-fluid rounded-4" alt="image" /></Link>
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

                        <div className="item dog col-md-4 col-lg-3 my-4" style={{ position: "absolute", left: "660px", top: "526.531px" }}>
                            <div className="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                                Sale
                            </div>
                            <div className="card position-relative">
                                <Link to="/single-product" style={{ textDecoration: 'none' }}><img src={item15} className="img-fluid rounded-4" alt="image" /></Link>
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

                        <div className="item cat col-md-4 col-lg-3 my-4" style={{ position: "absolute", left: "990px", top: "526.531px" }}>
                            <div className="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                                New
                            </div>
                            <div className="card position-relative">
                                <Link to="/single-product" style={{ textDecoration: 'none' }}><img src={item16} className="img-fluid rounded-4" alt="image" /></Link>
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
                    </div>
                </div>
            </section>
        </>
    )
}

export default FoodHome