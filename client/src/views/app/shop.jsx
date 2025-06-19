import React, { useState } from "react";
import ShopSidebar from "../components/shop/ShopSidebar/ShopSidebar";
import ShopProductList from "../components/shop/ProductList/ShopProductList";

const Shopage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [category, setCategory] = useState("all");

    const handleCategoryClick = (cat) => {
        setCategory(cat);
    };

    return (
        <div className="container py-5">
            <div className="row">
                {sidebarOpen && (
                    <div className="col-md-3">
                        <ShopSidebar
                            onCategoryClick={handleCategoryClick}
                            onClose={() => setSidebarOpen(false)}
                        />
                    </div>
                )}
                <div className={sidebarOpen ? "col-md-9" : "col-md-12"}>
                    {!sidebarOpen && (
                        <button onClick={() => setSidebarOpen(true)} className="btn btn-secondary mb-3">
                            Mở danh mục
                        </button>
                    )}
                    <ShopProductList category={category} />
                </div>
            </div>
        </div>
    );
};

export default Shopage;