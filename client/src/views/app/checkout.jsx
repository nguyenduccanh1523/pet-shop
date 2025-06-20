import React, { useState } from "react";
import { Link } from "react-router-dom"; // Giả sử bạn đang dùng react-router-dom
import logo from "../../assets/images/logo.png"

const Checkout = () => {
    // State để quản lý phương thức thanh toán được chọn
    const [paymentMethod, setPaymentMethod] = useState('cod');

    // Dữ liệu mẫu cho đơn hàng
    const orderItem = {
        name: "Hạt mèo mix toping thịt sấy DongPet - Cutepets",
        image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lsi7a4w1a70x9a", // Thay bằng ảnh sản phẩm thật
        price: 330000,
        quantity: 1,
    };

    return (
        <div style={{ background: '#f8f9fa', fontFamily: 'system-ui, sans-serif' }}>
            <div className="container py-5">
                {/* Logo */}
                <div className="text-center mb-5">
                    <Link to="/">
                        <img src={logo} alt="Cute Pets Logo" style={{ maxWidth: 180 }} />
                    </Link>
                </div>

                <form>
                    <div className="row g-5">
                        {/* --- CỘT BÊN TRÁI: THÔNG TIN KHÁCH HÀNG --- */}
                        <div className="col-lg-7">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="mb-0">Thông tin mua hàng</h4>
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    <i className="bi bi-person-circle me-1"></i>
                                    Đăng nhập
                                </Link>
                            </div>

                            {/* Form Fields */}
                            <div className="mb-3">
                                <input type="email" className="form-control p-2" placeholder="Email (tùy chọn)" />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control p-2" placeholder="Họ và tên" required />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text p-2">🇻🇳</span>
                                <input type="tel" className="form-control p-2" placeholder="Số điện thoại" required />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control p-2" placeholder="Địa chỉ" required />
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col-md-4">
                                    <select className="form-select p-2" defaultValue="">
                                        <option value="" disabled>Tỉnh thành</option>
                                        <option value="hcm">TP. Hồ Chí Minh</option>
                                        <option value="hanoi">Hà Nội</option>
                                        <option value="danang">Đà Nẵng</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                     <select className="form-select p-2 bg-light" disabled>
                                        <option value="">Quận huyện</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                     <select className="form-select p-2 bg-light" disabled>
                                        <option value="">Phường xã</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control p-2" rows="3" placeholder="Ghi chú (tùy chọn)"></textarea>
                            </div>

                            {/* --- Vận chuyển & Thanh toán --- */}
                            <div className="mt-5">
                                <h5 className="mb-3">Vận chuyển</h5>
                                <div className="alert alert-info" role="alert">
                                    Vui lòng nhập thông tin giao hàng
                                </div>
                            </div>

                            <div className="mt-4">
                                <h5 className="mb-3">Thanh toán</h5>
                                <div className={`border rounded p-3 mb-2 user-select-none ${paymentMethod === 'bank' ? 'border-primary shadow-sm' : 'border'}`} style={{cursor: 'pointer'}} onClick={() => setPaymentMethod('bank')}>
                                    <div className="form-check d-flex justify-content-between align-items-center">
                                        <div>
                                            <input className="form-check-input" type="radio" name="paymentMethod" id="bankTransfer" value="bank" checked={paymentMethod === 'bank'} onChange={() => {}}/>
                                            <label className="form-check-label ms-2" htmlFor="bankTransfer">Chuyển Khoản</label>
                                        </div>
                                        <i className="bi bi-credit-card fs-4 text-muted"></i>
                                    </div>
                                </div>
                                <div className={`border rounded p-3 user-select-none ${paymentMethod === 'cod' ? 'border-primary shadow-sm' : 'border'}`} style={{cursor: 'pointer'}} onClick={() => setPaymentMethod('cod')}>
                                    <div className="form-check d-flex justify-content-between align-items-center">
                                        <div>
                                            <input className="form-check-input" type="radio" name="paymentMethod" id="cod" value="cod" checked={paymentMethod === 'cod'} onChange={() => {}}/>
                                            <label className="form-check-label ms-2" htmlFor="cod">Thanh toán khi giao hàng (COD)</label>
                                        </div>
                                        <i className="bi bi-cash-coin fs-4 text-muted"></i>
                                    </div>
                                    {paymentMethod === 'cod' && (
                                        <div className="mt-2 p-2 bg-light rounded" style={{fontSize: '0.9em', marginLeft: 28}}>
                                            Thanh toán tiền hàng và ship cho nhân viên giao hàng
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* --- CỘT BÊN PHẢI: TÓM TẮT ĐƠN HÀNG --- */}
                        <div className="col-lg-5">
                            <div className="border rounded p-4" style={{ background: 'white' }}>
                                <h5 className="mb-4">Đơn hàng ({orderItem.quantity} sản phẩm)</h5>
                                
                                <div className="d-flex align-items-center mb-4">
                                    <div className="position-relative">
                                        <img src={orderItem.image} alt={orderItem.name} style={{ width: 60, height: 60, borderRadius: 8, border: '1px solid #ddd' }} />
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                                            {orderItem.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-grow-1 ms-3" style={{ fontSize: '0.9em' }}>{orderItem.name}</div>
                                    <div className="ms-3 fw-bold">{orderItem.price.toLocaleString()}đ</div>
                                </div>

                                <div className="input-group mb-4">
                                    <input type="text" className="form-control" placeholder="Nhập mã giảm giá" />
                                    <button className="btn btn-secondary" type="button">Áp dụng</button>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span>Tạm tính</span>
                                    <span>{orderItem.price.toLocaleString()}đ</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3 text-muted">
                                    <span>Phí vận chuyển</span>
                                    <span>-</span>
                                </div>

                                <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-3">
                                    <span>Tổng cộng</span>
                                    <span className="text-primary">{orderItem.price.toLocaleString()}đ</span>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <Link to="/cart" style={{ textDecoration: 'none' }}>&lt; Quay về giỏ hàng</Link>
                                    <button className="btn btn-primary btn-lg" type="submit">ĐẶT HÀNG</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Footer Links */}
                <div className="text-center mt-5" style={{ fontSize: '0.8em', color: '#888' }}>
                    <div className="mb-2">
                        <Link to="/policy" className="text-decoration-none mx-2">Chính sách hoàn trả</Link> |
                        <Link to="/privacy" className="text-decoration-none mx-2">Chính sách bảo mật</Link> |
                        <Link to="/terms" className="text-decoration-none mx-2">Điều khoản sử dụng</Link>
                    </div>
                    <p>Cảm ơn bạn đã đặt hàng tại petshophanoi.com. Chúng tôi sẽ gọi xác nhận đơn hàng sớm nhất cho bạn - Bạn cần tư vấn thêm về sản phẩm và cách thức đặt hàng. Vui lòng liên hệ số Hotline: 0949111520 (Thành) Xin cảm ơn!</p>
                </div>
            </div>
        </div>
    );
}

export default Checkout;