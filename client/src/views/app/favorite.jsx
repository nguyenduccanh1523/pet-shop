import React, { useState } from "react";
import { Link } from "react-router-dom";

// --- DỮ LIỆU MẪU ---
const initialFavoriteProducts = [
  {
    id: 1,
    name: "Hạt mềm cho chó Nutri Plan Softmune 200g",
    image: "https://images.unsplash.com/photo-1583337130417-234604081636?q=80&w=1974&auto=format&fit=crop",
    price: 40000,
    oldPrice: 50000,
  },
  {
    id: 2,
    name: "Dầu cá hồi PetCare Salmon Oil cho chó mèo",
    image: "https://images.unsplash.com/photo-1591854581753-26a19a9b6a12?q=80&w=1974&auto=format&fit=crop",
    price: 90000,
    oldPrice: null,
  },
  {
    id: 3,
    name: "Vòng cổ chống ve rận Bioline Flea and Tick Collar",
    image: "https://images.unsplash.com/photo-1587764379873-9781a94a285a?q=80&w=1974&auto=format&fit=crop",
    price: 50000,
    oldPrice: 62000,
  },
  {
    id: 4,
    name: "Bộ bát ăn và uống nước tự động Ornoou",
    image: "https://images.unsplash.com/photo-1589924849313-2b2369d4134a?q=80&w=1974&auto=format&fit=crop",
    price: 120000,
    oldPrice: 150000,
  },
];

// --- COMPONENT KHI KHÔNG CÓ SẢN PHẨM YÊU THÍCH ---
const EmptyFavorites = () => (
    <div className="text-center p-5 my-5">
        <img src="https://i.imgur.com/dCdflkn.png" alt="No favorites" style={{ maxWidth: 200, marginBottom: '2rem' }} />
        <h4 className="fw-bold">Danh sách yêu thích của bạn đang trống</h4>
        <p className="text-muted">Hãy lướt xem các sản phẩm tuyệt vời và lưu lại đây nhé!</p>
        <Link to="/shop" className="btn mt-3" style={{ background: '#e2a355', color: 'white', padding: '10px 30px' }}>
            Khám phá sản phẩm
        </Link>
    </div>
);

// --- COMPONENT THẺ SẢN PHẨM YÊU THÍCH ---
const FavoriteProductCard = ({ product, onRemove }) => (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div className="card h-100 border-0 shadow-sm" style={{ transition: 'box-shadow 0.2s' }} onMouseOver={e => e.currentTarget.style.boxShadow = '0 .5rem 1rem rgba(0,0,0,.15)'} onMouseOut={e => e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,.075)'}>
            <div className="position-relative">
                <img src={product.image} className="card-img-top" alt={product.name} style={{ height: 220, objectFit: 'cover' }}/>
                <button 
                    onClick={() => onRemove(product.id)}
                    className="btn btn-sm btn-light position-absolute"
                    style={{ top: 10, right: 10, borderRadius: '50%', width: 30, height: 30, lineHeight: '15px' }}
                    title="Xóa khỏi yêu thích"
                >
                    ✕
                </button>
            </div>
            <div className="card-body d-flex flex-column">
                <h6 className="card-title flex-grow-1">{product.name}</h6>
                <div>
                    <span className="fw-bold fs-5" style={{ color: '#e2a355' }}>{product.price.toLocaleString()}đ</span>
                    {product.oldPrice && (
                        <span className="text-muted text-decoration-line-through ms-2">{product.oldPrice.toLocaleString()}đ</span>
                    )}
                </div>
                <button className="btn w-100 mt-3" style={{ background: '#fff7ea', color: '#e2a355', fontWeight: 'bold' }}>
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    </div>
);

// --- TRANG YÊU THÍCH CHÍNH ---
const Favorite = () => {
    const [favorites, setFavorites] = useState(initialFavoriteProducts);
    const [sortOrder, setSortOrder] = useState('default');

    const handleRemoveFavorite = (productId) => {
        setFavorites(currentFavorites => currentFavorites.filter(p => p.id !== productId));
    };

    const sortedFavorites = [...favorites].sort((a, b) => {
        if (sortOrder === 'price-asc') return a.price - b.price;
        if (sortOrder === 'price-desc') return b.price - a.price;
        return 0; // 'default' or any other value
    });

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
            <div className="container py-5">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                    <h2 className="fw-bold">
                        <span style={{ color: '#e2a355' }}>♥</span> Sản phẩm yêu thích
                    </h2>
                    <div className="d-flex align-items-center">
                        <span className="me-2 text-muted">Sắp xếp theo:</span>
                        <select 
                            className="form-select" 
                            style={{ width: 'auto' }} 
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="default">Mặc định</option>
                            <option value="price-asc">Giá: Tăng dần</option>
                            <option value="price-desc">Giá: Giảm dần</option>
                        </select>
                    </div>
                </div>

                {/* Content */}
                {favorites.length === 0 ? (
                    <EmptyFavorites />
                ) : (
                    <div className="row">
                        {sortedFavorites.map(product => (
                            <FavoriteProductCard key={product.id} product={product} onRemove={handleRemoveFavorite} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorite;