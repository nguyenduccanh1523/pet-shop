import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { apiGetProductCategory } from "../../../../services/product/productCategory";
import item8 from "../../../../assets/images/item8.jpg"
import './ShopProductList.css';

const products = [
    {
        id: 1,
        name: "Dầu cá hồi PetCare Salmon Oil cho chó mèo",
        base_price: 90000,
        image: item8,
        sale: false,
        oldPrice: null,
        category: "nutrition"
    },
    {
        id: 2,
        name: "Túi vận chuyển khung kim loại 50x28x28cm",
        base_price: 330000,
        image: item8,
        sale: true,
        oldPrice: 390000,
        category: "transport"
    },
    {
        id: 3,
        name: "Tẩy giun Thái Prarintel Viên xố giun dành cho chó mèo",
        base_price: 20000,
        image: item8,
        sale: false,
        oldPrice: null,
        category: "vet"
    },
    {
        id: 4,
        name: "Thịt bò bằm Bolognese 500g Tươi cấp đông cho chó mèo",
        base_price: 40000,
        image: item8,
        sale: false,
        oldPrice: null,
        category: "dog"
    },
    {
        id: 5,
        name: "Hạt mềm cho chó Nutri Plan Softmune 200g",
        base_price: 40000,
        image: item8,
        sale: false,
        oldPrice: null,
        category: "dog"
    },
    {
        id: 6,
        name: "Bộ bát ăn và uống nước tự động Ornoou",
        base_price: 120000,
        image: item8,
        sale: true,
        oldPrice: 150000,
        category: "bowl"
    },
    {
        id: 7,
        name: "Hạt cho chó DogSmile 500g Dành cho mọi giống chó",
        base_price: 45000,
        image: item8,
        sale: false,
        oldPrice: null,
        category: "dog"
    },
    {
        id: 8,
        name: "Balo vận chuyển Pet Entrance Có bánh xe kéo 43x40x30cm",
        base_price: 620000,
        image: item8,
        sale: false,
        oldPrice: null,
        category: "transport"
    },
    {
        id: 9,
        name: "Hạt cho chó Puppy",
        base_price: 50000,
        image: item8,
        sale: false,
        oldPrice: null,
        category: "dog-food"
    },
    {
        id: 10,
        name: "Xương gặm cho chó",
        base_price: 30000,
        image: item8,
        sale: false,
        oldPrice: null,
        category: "dog-toy"
    }
];

const ShopProductList = () => {
    const [sort, setSort] = useState("default");
    const { categorySlug } = useParams();
    const navigate = useNavigate();

    // Lấy dữ liệu categories với products
    const { data: productCategory, isLoading } = useQuery({
        queryKey: ['productCategory'],
        queryFn: () => apiGetProductCategory({ populate: true }).then(res => res.data),
    });

    // Tìm category dựa trên slug
    const findCategoryBySlug = (slug) => {
        if (!productCategory?.data) return null;
        
        // Tìm trong parent categories
        let category = productCategory.data.find(cat => 
            cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
        );
        
        // Nếu không tìm thấy, tìm trong children
        if (!category) {
            for (const parentCat of productCategory.data) {
                if (parentCat.children) {
                    category = parentCat.children.find(child => 
                        child.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
                    );
                    if (category) break;
                }
            }
        }
        
        return category;
    };

    const currentCategory = findCategoryBySlug(categorySlug);
    const categoryProducts = currentCategory?.products || [];

    let filteredProducts = categorySlug 
        ? categoryProducts
        : products; // Fallback to mock data if no category

    if (sort === "price-asc") {
        filteredProducts = [...filteredProducts].sort((a, b) => (a.base_price || a.price) - (b.base_price || b.price));
    } else if (sort === "price-desc") {
        filteredProducts = [...filteredProducts].sort((a, b) => (b.base_price || b.price) - (a.base_price || a.price));
    }

    const getCategoryLabel = () => {
        if (!categorySlug) return "Tất cả sản phẩm";
        return currentCategory?.name || "Danh mục";
    };

    // Xử lý click vào sản phẩm
    const handleProductClick = (product) => {
        const productId = product._id || product.id;
        
        // Tìm category của sản phẩm này
        let productCategory = null;
        if (currentCategory) {
            productCategory = currentCategory;
        } else {
            // Tìm trong tất cả categories nếu không có currentCategory
            if (productCategory?.data) {
                for (const cat of productCategory.data) {
                    if (cat.products?.some(p => p._id === productId || p.id === productId)) {
                        productCategory = cat;
                        break;
                    }
                    if (cat.children) {
                        for (const child of cat.children) {
                            if (child.products?.some(p => p._id === productId || p.id === productId)) {
                                productCategory = child;
                                break;
                            }
                        }
                        if (productCategory) break;
                    }
                }
            }
        }
        
        // Tạo URL với query params để truyền thông tin category
        const params = new URLSearchParams();
        if (productCategory) {
            params.append('category', productCategory.name);
            params.append('categorySlug', productCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
        }
        
        
        const queryString = params.toString();
        const url = queryString ? `/product/${productId}?${queryString}` : `/product/${productId}`;
        
        navigate(url);
    };

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                        <li className="breadcrumb-item"><Link to="/shop">Cửa hàng</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {getCategoryLabel()}
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

            {isLoading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : categorySlug && !currentCategory ? (
                <div className="text-center py-5">
                    <h4 className="text-muted">Không tìm thấy danh mục</h4>
                    <p className="text-muted">Danh mục bạn đang tìm kiếm không tồn tại.</p>
                </div>
            ) : categorySlug && categoryProducts.length === 0 ? (
                <div className="text-center py-5">
                    <h4 className="text-muted">Không có sản phẩm</h4>
                    <p className="text-muted">Danh mục "{currentCategory?.name}" hiện chưa có sản phẩm nào.</p>
                </div>
            ) : (
                <div className="row shop-product-list" style={{ rowGap: 32 }}>
                    {filteredProducts.map((product) => (
                        <div className="col-md-3 mb-4" key={product.id || product._id}>
                            <div 
                                className="card position-relative h-100"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleProductClick(product)}
                                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                {product.sale && (
                                    <div className="product-sale-badge z-1 position-absolute rounded-3 m-2 px-2">
                                        -{Math.round(100 - ((product.base_price || product.price) / product.oldPrice) * 100)}%
                                    </div>
                                )}
                                <img src={product.image || product.images?.[0] || item8} className="card-img-top" alt={product.name} />
                                <div className="card-body d-flex flex-column p-3">
                                    <div>
                                        <h3 className="product-title">{product.name}</h3>
                                        <div className="rating secondary-font my-2">
                                            <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                            <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                            <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                            <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                            <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                            5.0
                                        </div>
                                        <h3 className="product-price secondary-font">
                                            ${(product.base_price || product.price)?.toLocaleString()}
                                            {product.oldPrice && (
                                                <span className="old-price">
                                                    ${product.oldPrice.toLocaleString()}
                                                </span>
                                            )}
                                        </h3>
                                    </div>
                                    <div className="d-flex mt-auto pt-3">
                                        <button 
                                            className="btn-cart flex-grow-1 me-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Xử lý thêm vào giỏ hàng
                                            }}
                                        >
                                            ADD TO CART
                                        </button>
                                        <button 
                                            className="btn-wishlist"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Xử lý thêm vào yêu thích
                                            }}
                                        >
                                            <iconify-icon icon="fluent:heart-28-filled" className="fs-5"></iconify-icon>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ShopProductList; 