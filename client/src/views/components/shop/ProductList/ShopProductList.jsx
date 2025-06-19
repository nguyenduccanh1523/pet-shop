import React, { useState } from "react";
import { Link } from 'react-router-dom';
import item8 from "../../../../assets/images/item8.jpg"
import './ShopProductList.css';

const products = [
    {
        id: 1,
        name: "Dầu cá hồi PetCare Salmon Oil cho chó mèo",
        price: 90000,
        image: item8,
        sale: false,
        oldPrice: null,
        category: "nutrition"
    },
    {
        id: 2,
        name: "Túi vận chuyển khung kim loại 50x28x28cm",
        price: 330000,
        image: item8,
        sale: true,
        oldPrice: 390000,
        category: "transport"
    },
    {
        id: 3,
        name: "Tẩy giun Thái Prarintel Viên xố giun dành cho chó mèo",
        price: 20000,
        image: item8,
        sale: false,
        oldPrice: null,
        category: "vet"
    },
    {
        id: 4,
        name: "Thịt bò bằm Bolognese 500g Tươi cấp đông cho chó mèo",
        price: 40000,
        image: item8,
        sale: false,
        oldPrice: null,
        category: "dog"
    },
    {
        id: 5,
        name: "Hạt mềm cho chó Nutri Plan Softmune 200g",
        price: 40000,
        image: item8,
        sale: false,
        oldPrice: null,
        category: "dog"
    },
    {
        id: 6,
        name: "Bộ bát ăn và uống nước tự động Ornoou",
        price: 120000,
        image: item8,
        sale: true,
        oldPrice: 150000,
        category: "bowl"
    },
    {
        id: 7,
        name: "Hạt cho chó DogSmile 500g Dành cho mọi giống chó",
        price: 45000,
        image: item8,
        sale: false,
        oldPrice: null,
        category: "dog"
    },
    {
        id: 8,
        name: "Balo vận chuyển Pet Entrance Có bánh xe kéo 43x40x30cm",
        price: 620000,
        image: item8,
        sale: false,
        oldPrice: null,
        category: "transport"
    },
    {
        id: 9,
        name: "Hạt cho chó Puppy",
        price: 50000,
        image: item8,
        sale: false,
        oldPrice: null,
        category: "dog-food"
    },
    {
        id: 10,
        name: "Xương gặm cho chó",
        price: 30000,
        image: item8,
        sale: false,
        oldPrice: null,
        category: "dog-toy"
    }
];

const categoryLabels = {
    all: "Tất cả sản phẩm",
    dog: "Dành cho chó",
    cat: "Dành cho mèo",
    accessory: "Dây dắt, phụ kiện",
    clothes: "Quần áo",
    bowl: "Bát bình chứa đựng",
    transport: "Đồ vận chuyển, nuôi nhốt",
    bath: "Sữa tắm, Khử mùi",
    care: "Hỗ trợ chăm sóc",
    nutrition: "Bổ sung dinh dưỡng",
    vet: "Thú Y",
    "dog-food": "Thức Ăn Chó",
    "dog-nutrition": "Bổ sung dinh dưỡng cho chó",
    "dog-toy": "Đồ chơi, Huấn luyện cho chó",
    "dog-accessory": "Đồ dùng cho chó"
};

const ShopProductList = ({ category }) => {
    const [sort, setSort] = useState("default");

    let filteredProducts = category === "all"
        ? products
        : products.filter(p => p.category === category);

    if (sort === "price-asc") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {categoryLabels[category] || "Danh mục"}
                        </li>
                    </ol>
                </nav>
                <div className="d-flex align-items-center">
                    <span className="me-2">Sắp xếp:</span>
                    <select
                        className="form-select"
                        style={{ width: 150 }}
                        value={sort}
                        onChange={e => setSort(e.target.value)}
                    >
                        <option value="default">Thứ tự</option>
                        <option value="price-asc">Giá tăng dần</option>
                        <option value="price-desc">Giá giảm dần</option>
                    </select>
                </div>
            </div>
            <div className="row shop-product-list" style={{ rowGap: 32 }}>
                {filteredProducts.map((product) => (
                    <div className="col-md-3 mb-4" key={product.id}>
                        <div className="card position-relative" style={{ minHeight: 420 }}>
                            {product.sale && (
                                <div className="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle" style={{ left: 0, top: 0, background: '#f5f5f5' }}>
                                    -{Math.round(100 - (product.price / product.oldPrice) * 100)}%
                                </div>
                            )}
                            <img src={product.image} className="img-fluid rounded-4" alt={product.name} />
                            <div className="card-body p-0">
                                <h3 className="card-title pt-4 m-0" style={{ minHeight: 60 }}>{product.name}</h3>
                                <div className="card-text">
                                    <span className="rating secondary-font">
                                        <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                        <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                        <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                        <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                        <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                        5.0
                                    </span>
                                    <h3 className="secondary-font text-primary" style={{ color: '#e2a355' }}>
                                        {product.price.toLocaleString()}đ
                                        {product.oldPrice && (
                                            <span style={{ color: '#aaa', fontSize: 16, marginLeft: 8, textDecoration: 'line-through' }}>
                                                {product.oldPrice.toLocaleString()}đ
                                            </span>
                                        )}
                                    </h3>
                                    <div className="d-flex flex-wrap mt-3">
                                        <button className="btn-cart me-3 px-4 pt-3 pb-3" style={{ textDecoration: 'none' }}>
                                            <h5 className="text-uppercase m-0">Add to Cart</h5>
                                        </button>
                                        <button className="btn-wishlist px-4 pt-3" style={{ textDecoration: 'none' }}>
                                            <iconify-icon icon="fluent:heart-28-filled" className="fs-5"></iconify-icon>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ShopProductList; 