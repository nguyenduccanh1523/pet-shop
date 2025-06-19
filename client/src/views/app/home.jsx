import React from "react";
import Ads from "../components/home/Ads/ads";
import CategoryHome from "../components/home/Category/categoryHome";
import ClothingHome from "../components/home/Clothing/clothingHome";
import FoodHome from "../components/home/Foodie/foodHome";
import PromotionHome from "../components/home/Promotion/promotionHome";
import NoteHome from "../components/home/Note/noteHome";
import BestSellHome from "../components/home/BestSell/bestSellHome";
import BlogHome from "../components/home/Blog/blogHome";
import ServiceHome from "../components/home/Service/serviceHome";


const Homepage = () => {
    return (
        <>
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