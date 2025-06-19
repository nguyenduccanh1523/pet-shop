import React from "react";
import Review from "../components/products/Review/review";
import Product from "../components/products/Product/product";


const SingleProduct = () => {
    return (
        <div className="container py-4">
            {/* Breadcrumb */}
            <div className="mb-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0" style={{ background: "none" }}>
                        <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                        <li className="breadcrumb-item"><a href="#">Thức ăn dành cho chó</a></li>
                        <li className="breadcrumb-item active" aria-current="page" style={{ color: "#e2a355" }}>
                            Hạt mềm cho chó Nutri Plan Softmune 200g
                        </li>
                    </ol>
                </nav>
            </div>
            {/* Thông tin sản phẩm */}
            <Product />
            {/* Thông tin dịch vụ bên phải (nếu muốn tách riêng, có thể tạo component ServiceInfo) */}
            <div className="row mt-4">
                <div className="col-md-8">
                    <Review />
                </div>
                <div className="col-md-4">
                    <div style={{ background: "#fff7ea", borderRadius: 12, padding: 18 }}>
                        <div className="mb-2"><b>🚚 Giao hàng nhanh chóng</b><br /><span style={{ color: "#888" }}>Nội thành Hoà tốc 30 phút</span></div>
                        <div className="mb-2"><b>🛡️ Sản phẩm chính hãng</b><br /><span style={{ color: "#888" }}>Sản phẩm nhập khẩu 100%</span></div>
                        <div className="mb-2"><b>🔄 Đổi trả cực kì dễ dàng</b><br /><span style={{ color: "#888" }}>Đổi trả trong 5 ngày đầu tiên</span></div>
                        <div className="mb-2"><b>💰 Mua hàng tiết kiệm</b><br /><span style={{ color: "#888" }}>Tiết kiệm hơn từ 10% - 30%</span></div>
                        <div className="mb-2"><b>📞 Hotline mua hàng:</b><br /><span style={{ color: "#e2a355", fontWeight: 600 }}>0949111520</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct;