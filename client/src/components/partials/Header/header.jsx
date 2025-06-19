import React from "react";

import logo from "../../../assets/images/logo.png"

const Header = () => {
    return (
        <>
            <div className="container py-2">
                <div className="row py-4 pb-0 pb-sm-4 align-items-center ">

                    <div className="col-sm-4 col-lg-3 text-center text-sm-start">
                        <div className="main-logo">
                            <a href="index.html">
                                <img src={logo} alt="logo" className="img-fluid"/>
                            </a>
                        </div>
                    </div>

                    <div className="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block">
                        <div className="search-bar border rounded-2 px-3 border-dark-subtle">
                            <form id="search-form" className="text-center d-flex align-items-center" action="" method="">
                                <input type="text" className="form-control border-0 bg-transparent"
                                    placeholder="Search for more than 10,000 products" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" />
                                </svg>
                            </form>
                        </div>
                    </div>

                    <div
                        className="col-sm-8 col-lg-4 d-flex justify-content-end gap-5 align-items-center mt-4 mt-sm-0 justify-content-center justify-content-sm-end">
                        <div className="support-box text-end d-none d-xl-block">
                            <span className="fs-6 secondary-font text-muted">Phone</span>
                            <h5 className="mb-0">+980-34984089</h5>
                        </div>
                        <div className="support-box text-end d-none d-xl-block">
                            <span className="fs-6 secondary-font text-muted">Email</span>
                            <h5 className="mb-0">waggy@gmail.com</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header