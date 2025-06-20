import React from "react";
import { Link } from "react-router-dom";

// Dữ liệu mẫu cho sản phẩm của store
const storeProducts = [
  { id: 1, name: "Cáp chuyển HDMI sang VGA", price: 34000, image: "https://down-vn.img.susercontent.com/file/sg-11134201-22110-s465757eytjv29" },
  { id: 2, name: "Bộ cáp chuyển đổi tín hiệu", price: 50000, image: "https://down-vn.img.susercontent.com/file/b7b13a3b5c6e3c1d4d5a3c5d6e7f8a9a" },
  { id: 3, name: "USB Kingston 32GB", price: 120000, image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lq4x5n6m3h4v8d" },
  { id: 4, name: "Chuột không dây Logitech", price: 250000, image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lsi7a4w1a70x9a" }
];

// Component nhỏ cho từng sản phẩm
const ProductCard = ({ product }) => (
    <div className="col-md-3 mb-4">
        <div className="card h-100">
            <img src={product.image} className="card-img-top" alt={product.name} style={{height: 200, objectFit: 'cover'}} />
            <div className="card-body">
                <h6 className="card-title">{product.name}</h6>
                <p className="card-text text-danger fw-bold">{product.price.toLocaleString()}đ</p>
            </div>
        </div>
    </div>
);


const SingleStore = () => {
    const storeInfo = {
        name: "NGUYENTHONG_COMPUTER",
        logo: "https://i.imgur.com/J3t52pM.png", // Placeholder logo
        onlineStatus: "Online 1 giờ trước",
        products: 135,
        following: 99,
        chatResponse: "72% (Trong Vài Giờ)",
        followers: "5,8k",
        rating: "4.8 (10,8k Đánh Giá)",
        joinDate: "33 Tháng Trước"
    };

    const navItems = ["Dạo", "Sản phẩm", "Phụ Kiện Máy Tính", "Thiết Bị Mạng", "Loa", "Gaming"];

    return (
        <div>
            {/* Top orange bar */}
            <div style={{ height: '4px', background: '#ee4d2d' }}></div>

            <div className="container py-4">
                <div className="bg-white p-4 d-flex" style={{ borderRadius: 4, boxShadow: '0 1px 2px rgba(0,0,0,0.1)'}}>
                    {/* Left: Store Card */}
                    <div className="d-flex align-items-center p-3 text-white" style={{ background: 'linear-gradient(to bottom, #3a3a5a, #2e2e4a)', borderRadius: 4, minWidth: 300 }}>
                        <img src={storeInfo.logo} alt="logo" style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid white' }} />
                        <div className="ms-3">
                            <h5 className="fw-bold mb-1">{storeInfo.name}</h5>
                            <p className="mb-2" style={{fontSize: 14}}>{storeInfo.onlineStatus}</p>
                            <div>
                                <button className="btn btn-sm btn-outline-light me-2">+ Theo Dõi</button>
                                <button className="btn btn-sm btn-outline-light">💬 Chat</button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Store Stats */}
                    <div className="flex-grow-1 ps-5 d-grid align-content-center" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px 24px' }}>
                        <div><span className="me-2">🛍️</span>Sản Phẩm: <span style={{ color: '#ee4d2d' }}>{storeInfo.products}</span></div>
                        <div><span className="me-2">❤️</span>Đang Theo: <span style={{ color: '#ee4d2d' }}>{storeInfo.following}</span></div>
                        <div><span className="me-2">💬</span>Tỉ Lệ Phản Hồi Chat: <span style={{ color: '#ee4d2d' }}>{storeInfo.chatResponse}</span></div>
                        <div><span className="me-2">👥</span>Người Theo Dõi: <span style={{ color: '#ee4d2d' }}>{storeInfo.followers}</span></div>
                        <div><span className="me-2">⭐</span>Đánh Giá: <span style={{ color: '#ee4d2d' }}>{storeInfo.rating}</span></div>
                        <div><span className="me-2">🕒</span>Tham Gia: <span style={{ color: '#ee4d2d' }}>{storeInfo.joinDate}</span></div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white mt-1 p-3 d-flex align-items-center" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                    {navItems.map((item, index) => (
                        <div key={item} className="px-4 py-2" style={{ cursor: 'pointer', borderBottom: index === 0 ? '3px solid #ee4d2d' : 'none', color: index === 0 ? '#ee4d2d' : 'inherit' }}>
                            {item}
                        </div>
                    ))}
                    <div className="px-4 py-2 dropdown" style={{ cursor: 'pointer', marginLeft: 'auto' }}>
                        Thêm ▼
                    </div>
                </div>

                {/* Product List Section */}
                <div className="mt-4">
                    <h4 className="mb-3">Tất cả sản phẩm</h4>
                    <div className="row">
                        {storeProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleStore;