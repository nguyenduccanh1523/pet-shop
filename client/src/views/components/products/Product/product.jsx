import React, { useState } from "react";
import item1 from "../../../../assets/images/item8.jpg"; // Thay bằng ảnh thật nếu có

const productImages = [
  item1,
  item1,
  item1,
  item1
];

const productTypes = [
  { label: "TỐT XƯƠNG KHỚP (XANH)", value: "xanh" },
  { label: "ĐẸP DA LÔNG (VÀNG)", value: "vang" }
];

const Product = () => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedType, setSelectedType] = useState(productTypes[0].value);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="row">
      {/* Ảnh sản phẩm */}
      <div className="col-md-5">
        <div className="text-center mb-3">
          <img src={productImages[selectedImg]} alt="main" style={{ width: 320, borderRadius: 12, boxShadow: "0 2px 12px #eee" }} />
        </div>
        <div className="d-flex justify-content-center gap-2">
          {productImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              style={{
                width: 60,
                height: 60,
                objectFit: "cover",
                borderRadius: 8,
                border: selectedImg === idx ? "2px solid #e2a355" : "1px solid #eee",
                cursor: "pointer"
              }}
              onClick={() => setSelectedImg(idx)}
            />
          ))}
        </div>
      </div>
      {/* Thông tin sản phẩm */}
      <div className="col-md-7">
        <h2 className="fw-bold mb-2">Hạt mềm cho chó Nutri Plan Softmune 200g</h2>
        <div className="mb-2" style={{ fontSize: 15 }}>
          Thương hiệu: <span style={{ color: "#e2a355" }}>Nutri Plan</span> &nbsp;|&nbsp;
          Tình trạng: <span style={{ color: "#2ecc40" }}>Còn hàng</span>
        </div>
        <div className="mb-2" style={{ fontSize: 15 }}>
          SKU: HMCNS200X &nbsp;|&nbsp; Serial: 880107464354
        </div>
        <div className="mb-2">
          <span style={{ color: "#e2a355", fontSize: 22, fontWeight: 700 }}>40.000đ</span>
        </div>
        <div className="mb-2">
          <span style={{ color: "#e2a355" }}>
            {[1,2,3,4,5].map(i => (
              <iconify-icon key={i} icon="clarity:star-solid" class="text-primary" style={{ color: "#e2a355", fontSize: 18 }}></iconify-icon>
            ))}
          </span>
          <span className="ms-2" style={{ fontSize: 15, color: "#007bff", cursor: "pointer" }}>Viết đánh giá của bạn</span>
        </div>
        <div className="mb-3" style={{ fontSize: 15, color: "#444" }}>
          <span role="img" aria-label="dog">🐶</span> HẠT MỀM CHO CHÓ NUTRI PLAN SOFTMUNE – SIÊU PHẨM DINH DƯỠNG CHO CÚN YÊU! Bạn đang tìm kiếm một loại hạt mềm, dễ nhai, giàu dinh dưỡng giúp cún yêu khỏe mạnh, lông mượt, xương chắc? <br />
          <span style={{ color: "#e2a355", cursor: "pointer" }}>[Xem tiếp]</span>
        </div>
        <div className="mb-2" style={{ fontSize: 15 }}>
          <span className="fw-bold">Loại:</span>
          <div className="d-flex flex-wrap gap-2 mt-2">
            {productTypes.map(type => (
              <button
                key={type.value}
                className="btn"
                style={{
                  border: selectedType === type.value ? "2px solid #e2a355" : "1px solid #ddd",
                  background: selectedType === type.value ? "#fff7ea" : "#fff",
                  color: "#e2a355",
                  fontWeight: 600,
                  borderRadius: 8,
                  padding: "6px 16px"
                }}
                onClick={() => setSelectedType(type.value)}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-3 d-flex flex-wrap gap-2">
          <span className="border rounded px-2 py-1" style={{ fontSize: 14 }}>TÚI 1.2KG 6 TỐT XƯƠNG KHỚP (XANH)</span>
          <span className="border rounded px-2 py-1" style={{ fontSize: 14 }}>TÚI 1.2KG 6 ĐẸP DA LÔNG (VÀNG)</span>
        </div>
        <div className="d-flex align-items-center gap-2 mb-3">
          <button className="btn btn-light border" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
          <span style={{ minWidth: 32, textAlign: "center" }}>{quantity}</span>
          <button className="btn btn-light border" onClick={() => setQuantity(q => q + 1)}>+</button>
          <button className="btn" style={{ background: "#ffe0a3", color: "#222", fontWeight: 600, marginLeft: 12 }}>
            <iconify-icon icon="mdi:cart" style={{ color: "#e2a355", fontSize: 20, marginRight: 4 }}></iconify-icon>
            Mua hàng
          </button>
          <button className="btn" style={{ background: "#ff4d2d", color: "#fff", fontWeight: 600, marginLeft: 8 }}>
            Chat với shop
          </button>
        </div>
        <div className="mb-2">
          <button className="btn btn-outline-secondary" style={{ borderRadius: 8 }}>
            <iconify-icon icon="fluent:heart-28-filled" style={{ color: "#e2a355", fontSize: 18, marginRight: 4 }}></iconify-icon>
            Thêm vào yêu thích
          </button>
        </div>
        <div className="mt-3" style={{ color: "#ff4d2d", fontWeight: 600 }}>
          Gọi ngay <span style={{ color: "#e2a355" }}>0949111520</span> để có được giá tốt nhất!
        </div>
      </div>
    </div>
  );
};

export default Product;