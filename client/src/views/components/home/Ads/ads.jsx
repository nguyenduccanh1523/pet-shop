import React from "react";
import Slider from "react-slick";
import banner1 from "../../../../assets/images/banner-img.png"
import banner2 from "../../../../assets/images/banner-img3.png"
import banner3 from "../../../../assets/images/banner-img4.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
    {
        img: banner1,
        content: (
            <>
                <div className="secondary-font text-primary text-uppercase mb-4">Save 10 - 20 % off</div>
                <h2 className="banner-title display-1 fw-normal">Best destination for <span className="text-warning">your
                    pets</span>
                </h2>
                <a href="#" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1">
                    shop now
                    <svg width="24" height="24" viewBox="0 0 24 24" className="mb-1">
                        <use xlinkHref="#arrow-right"></use>
                    </svg></a>
            </>
        ),
    },
    {
        img: banner2,
        content: (
            <>
                <div className="secondary-font text-primary text-uppercase mb-4">Save 10 - 20 % off</div>
                <h2 className="banner-title display-1 fw-normal">Best destination for <span className="text-warning">your
                    pets</span>
                </h2>
                <a href="#" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1">
                    shop now
                    <svg width="24" height="24" viewBox="0 0 24 24" className="mb-1">
                        <use xlinkHref="#arrow-right"></use>
                    </svg></a>
            </>
        ),
    },
    {
        img: banner3,
        content: (
            <>
                <div className="secondary-font text-primary text-uppercase mb-4">Save 10 - 20 % off</div>
                <h2 className="banner-title display-1 fw-normal">Best destination for <span className="text-warning">your
                    pets</span>
                </h2>
                <a href="#" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1">
                    shop now
                    <svg width="24" height="24" viewBox="0 0 24 24" className="mb-1">
                        <use xlinkHref="#arrow-right"></use>
                    </svg></a>
            </>
        ),
    },
];

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
};

const Ads = () => {
    return (
        <section id="banner" style={{ background: "#F9F3EC" }}>
            <div className="container">
                <Slider {...settings}>
                    {slides.map((slide, idx) => (
                        <div key={idx}>
                            <div className="row banner-content align-items-center">
                                <div className="img-wrapper col-md-5">
                                    <img src={slide.img} className="img-fluid" alt="banner" />
                                </div>
                                <div className="content-wrapper col-md-7 p-5 mb-5">
                                    {slide.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    )
}

export default Ads