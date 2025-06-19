import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './noteHome.css';

const testimonials = [
    {
        content: `At the core of our practice is the idea that cities are the incubators of our greatest achievements, and the best hope for a sustainable future.`,
        author: 'Joshima Lin',
    },
    {
        content: `At the core of our practice is the idea that cities are the incubators of our greatest achievements, and the best hope for a sustainable future.`,
        author: 'Joshima Lin',
    },
    {
        content: `At the core of our practice is the idea that cities are the incubators of our greatest achievements, and the best hope for a sustainable future.`,
        author: 'Joshima Lin',
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

const NoteHome = () => {
    return (
        <section id="testimonial">
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="offset-md-1 col-md-10">
                        <Slider {...settings}>
                            {testimonials.map((item, idx) => (
                                <div key={idx}>
                                    <div className="row align-items-center">
                                        <div className="col-2 d-flex justify-content-center">
                                            <iconify-icon icon="ri:double-quotes-l" className="quote-icon text-primary" style={{ fontSize: '8rem', color: '#e2a355' }}></iconify-icon>
                                        </div>
                                        <div className="col-md-10 mt-md-5 p-5 pt-0 pt-md-5">
                                            <p className="testimonial-content fs-2" style={{ fontFamily: 'Indie Flower, cursive', fontSize: '2.5rem', color: '#a6a29e', lineHeight: 1.4 }}>
                                                {item.content}
                                            </p>
                                            <p className="testimonial-author" style={{ fontFamily: 'Indie Flower, cursive', color: '#222', fontSize: '1.1rem', marginTop: '2rem' }}>- {item.author}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NoteHome