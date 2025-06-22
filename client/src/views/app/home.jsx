import React, { useEffect } from "react";
import Ads from "../components/home/Ads/ads";
import CategoryHome from "../components/home/Category/categoryHome";
import ClothingHome from "../components/home/Clothing/clothingHome";
import FoodHome from "../components/home/Foodie/foodHome";
import PromotionHome from "../components/home/Promotion/promotionHome";
import NoteHome from "../components/home/Note/noteHome";
import BestSellHome from "../components/home/BestSell/bestSellHome";
import BlogHome from "../components/home/Blog/blogHome";
import ServiceHome from "../components/home/Service/serviceHome";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Homepage = () => { 
    const { isLoggedIn, user } = useSelector((state) => state.root.auth || {});

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (
            isLoggedIn &&
            user?.username &&
            token &&
            !localStorage.getItem("toastShown") &&
            !toast.isActive("login-toast")
        ) {
            toast.success(
                <div>
                    <h5>Welcome {user.username},</h5>
                    <p>
                        Bạn đã đăng nhập thành công. Chúc bạn trải nghiệm vui vẻ!
                    </p>
                </div>,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    toastId: "login-toast",
                    onClose: () => {
                        localStorage.setItem("toastShown", true);
                    },
                }
            );
        }
    }, [isLoggedIn, user, user?.username]);

    return (
        <>
            <ToastContainer />
            <Ads />
            <CategoryHome />
            <ClothingHome />
            <FoodHome />
            <PromotionHome />
            <NoteHome />
            <BestSellHome />
            <BlogHome />
            <ServiceHome />
        </>
    )
}

export default Homepage