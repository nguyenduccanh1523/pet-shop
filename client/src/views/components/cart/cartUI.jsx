import React, { useState } from "react";
import { Link } from "react-router-dom"; // Giả sử bạn dùng react-router-dom

// Dữ liệu mẫu cho giỏ hàng
const initialCartData = [
  {
    shopName: "NGUYENTHONG_COMPUTER",
    shopPromo: "Mua thêm 2 sản phẩm để giảm 2%",
    shippingPromo: "Giảm ₫700.000 phí vận chuyển đơn tối thiểu ₫0; Giảm ₫1.000.000 phí vận chuyển đơn tối thiểu ₫500.000",
    products: [
      {
        id: 1,
        name: "Cáp chuyển HDMI sang VGA, HDMI to VGA máy tính sang m...",
        image: "https://down-vn.img.susercontent.com/file/sg-11134201-22110-s465757eytjv29", // Thay bằng ảnh thật
        oldPrice: 35000,
        price: 34000,
        quantity: 1,
      },
    ],
  },
  {
    shopName: "phukienchuyendoi",
    isLiked: true,
    products: [
      {
        id: 2,
        name: "Bộ cáp chuyển đổi tín hiệu từ VGA sang HDMI có âm thanh...",
        image: "https://down-vn.img.susercontent.com/file/b7b13a3b5c6e3c1d4d5a3c5d6e7f8a9a", // Thay bằng ảnh thật
        oldPrice: 55000,
        price: 50000,
        quantity: 1,
      },
    ],
  },
];

// Component nhỏ cho ô số lượng
const QuantitySelector = ({ quantity, onDecrease, onIncrease }) => (
  <div className="d-flex align-items-center border" style={{ width: 'fit-content', borderRadius: 2 }}>
    <button className="btn btn-sm" onClick={onDecrease} style={{ border: 'none', background: 'transparent' }}>-</button>
    <span className="px-2">{quantity}</span>
    <button className="btn btn-sm" onClick={onIncrease} style={{ border: 'none', background: 'transparent' }}>+</button>
  </div>
);

const CartUI = () => {
  const [cartItems, setCartItems] = useState(initialCartData);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Hàm cập nhật số lượng
  const handleQuantityChange = (shopIndex, productIndex, newQuantity) => {
    if (newQuantity < 1) return;
    const newCartItems = [...cartItems];
    newCartItems[shopIndex].products[productIndex].quantity = newQuantity;
    setCartItems(newCartItems);
  };

  // Hàm chọn/bỏ chọn sản phẩm
  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };
  
  // Hàm chọn tất cả sản phẩm
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allProductIds = cartItems.flatMap(shop => shop.products.map(p => p.id));
      setSelectedProducts(allProductIds);
    } else {
      setSelectedProducts([]);
    }
  };

  // Tính tổng tiền
  const calculateTotal = () => {
    let total = 0;
    let selectedCount = 0;
    cartItems.forEach(shop => {
      shop.products.forEach(p => {
        if (selectedProducts.includes(p.id)) {
          total += p.price * p.quantity;
          selectedCount++;
        }
      });
    });
    return { total, selectedCount };
  };

  const { total, selectedCount } = calculateTotal();
  
  return (
    <div className="container py-4" style={{ background: '#f5f5f5', maxWidth: '100%' }}>
      {/* Breadcrumb */}
      <div className="mb-3 container" style={{ maxWidth: 1200, padding: 0 }}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent px-0 mb-0">
            <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
            <li className="breadcrumb-item active" aria-current="page" style={{ color: "#e2a355" }}>
              Giỏ hàng
            </li>
          </ol>
        </nav>
      </div>
      
      {/* Cart Header */}
      <div className="d-none d-md-flex text-center p-3 mb-3 bg-white" style={{ borderRadius: 4, boxShadow: "0 1px 1px 0 rgba(0,0,0,.05)", maxWidth: 1200, margin: 'auto' }}>
        <div style={{ flex: '3 0 0' }} className="d-flex align-items-center">
            <input type="checkbox" className="me-2" style={{ marginLeft: 20 }} />
            Sản Phẩm
        </div>
        <div style={{ flex: '1 0 0' }}>Đơn Giá</div>
        <div style={{ flex: '1 0 0' }}>Số Lượng</div>
        <div style={{ flex: '1 0 0' }}>Số Tiền</div>
        <div style={{ flex: '1 0 0' }}>Thao Tác</div>
      </div>

      {/* Cart Items */}
      <div style={{ maxWidth: 1200, margin: 'auto' }}>
        {cartItems.map((shop, shopIndex) => (
          <div key={shop.shopName} className="bg-white mb-3" style={{ borderRadius: 4, boxShadow: "0 1px 1px 0 rgba(0,0,0,.05)" }}>
            <div className="p-3 d-flex align-items-center border-bottom">
              <input type="checkbox" className="me-2" />
              <span className="fw-bold me-2">{shop.shopName}</span>
              <span style={{ color: '#ee4d2d', fontSize: 18 }}>🧧</span>
            </div>

            {shop.shopPromo && (
              <div className="p-3 border-bottom d-flex align-items-center" style={{ background: '#fffefb' }}>
                <span style={{ color: '#ee4d2d', border: '1px solid #ee4d2d', padding: '0 4px', fontSize: 13, marginRight: 8 }}>Combo khuyến mãi</span>
                <span style={{ fontSize: 14 }}>{shop.shopPromo}</span>
                <span className="ms-auto" style={{ color: '#007bff', cursor: 'pointer' }}> &gt; </span>
              </div>
            )}
            
            {shop.products.map((product, productIndex) => (
                <div key={product.id} className="d-flex align-items-center p-3 border-bottom text-center">
                    <div style={{ flex: '3 0 0' }} className="d-flex align-items-center text-start">
                        <input type="checkbox" className="me-3" checked={selectedProducts.includes(product.id)} onChange={() => handleSelectProduct(product.id)} />
                        <img src={product.image} alt={product.name} style={{ width: 80, height: 80, objectFit: 'cover', marginRight: 12 }}/>
                        <span>{product.name}</span>
                    </div>
                    <div style={{ flex: '1 0 0' }}>
                        <span style={{ textDecoration: 'line-through', color: '#999' }}>{product.oldPrice.toLocaleString()}đ</span>
                        <span className="ms-2">{product.price.toLocaleString()}đ</span>
                    </div>
                    <div style={{ flex: '1 0 0' }} className="d-flex justify-content-center">
                        <QuantitySelector
                            quantity={product.quantity}
                            onDecrease={() => handleQuantityChange(shopIndex, productIndex, product.quantity - 1)}
                            onIncrease={() => handleQuantityChange(shopIndex, productIndex, product.quantity + 1)}
                        />
                    </div>
                    <div style={{ flex: '1 0 0', color: '#ee4d2d' }}>
                        {(product.price * product.quantity).toLocaleString()}đ
                    </div>
                    <div style={{ flex: '1 0 0' }}>
                        <span className="text-danger" style={{ cursor: 'pointer' }}>Xóa</span><br/>
                        <span style={{ color: '#007bff', fontSize: 13, cursor: 'pointer' }}>Tìm sản phẩm tương tự ▼</span>
                    </div>
                </div>
            ))}
            {shop.shippingPromo && (
                <div className="p-3 d-flex align-items-center" style={{fontSize: 14}}>
                    <span style={{color: '#26aa99', fontSize: 18, marginRight: 8}}>🚚</span>
                    <span>{shop.shippingPromo} <span style={{color: '#007bff', cursor: 'pointer'}}>Tìm hiểu thêm</span></span>
                </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="d-flex flex-column p-3 mt-3 bg-white" style={{ borderRadius: 4, boxShadow: "0 -1px 1px 0 rgba(0,0,0,.05)", maxWidth: 1200, margin: 'auto' }}>
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
            <div>
                <span style={{color: '#ee4d2d', fontSize: 18}}>🎟️</span> <span className="fw-bold">Shopee Voucher</span>
            </div>
            <span style={{color: '#007bff', cursor: 'pointer'}}>Chọn hoặc nhập mã</span>
        </div>
        <div className="d-flex justify-content-end align-items-center pt-3">
            <div className="me-3">
                <input type="checkbox" checked={selectedProducts.length > 0 && selectedProducts.length === cartItems.flatMap(s => s.products).length} onChange={handleSelectAll} />
                <span className="ms-2">Chọn Tất Cả ({cartItems.flatMap(s=>s.products).length})</span>
                <span className="ms-3" style={{cursor: 'pointer'}}>Xóa</span>
                <span className="ms-3" style={{color: '#ee4d2d', cursor: 'pointer'}}>Lưu vào mục Đã thích</span>
            </div>
            <div className="d-flex align-items-center">
                <div className="me-3">
                    Tổng cộng ({selectedCount} Sản phẩm): <span className="fs-4 fw-bold" style={{color: '#ee4d2d'}}>{total.toLocaleString()}đ</span>
                </div>
                <button className="btn px-5 py-2" style={{backgroundColor: '#ee4d2d', color: 'white'}}>
                    Mua Hàng
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CartUI;
