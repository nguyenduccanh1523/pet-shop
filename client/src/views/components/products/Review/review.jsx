import React from "react";

const Review = () => (
  <div className="mt-5">
    <h5 className="fw-bold mb-3" style={{ color: "#e2a355" }}>Đánh giá sản phẩm</h5>
    <div className="mb-3">
      <div className="d-flex align-items-center mb-1">
        <span style={{ fontWeight: 600, marginRight: 8 }}>Nguyễn Văn A</span>
        <span style={{ color: "#e2a355" }}>
          {[1,2,3,4,5].map(i => (
            <iconify-icon key={i} icon="clarity:star-solid" style={{ fontSize: 16, color: "#e2a355" }}></iconify-icon>
          ))}
        </span>
      </div>
      <div style={{ fontSize: 15, color: "#444" }}>
        Sản phẩm rất tốt, cún nhà mình rất thích, shop giao hàng nhanh!
      </div>
      <div style={{ fontSize: 13, color: "#aaa" }}>12/06/2024</div>
    </div>
    <div className="mb-3">
      <div className="d-flex align-items-center mb-1">
        <span style={{ fontWeight: 600, marginRight: 8 }}>Trần Thị B</span>
        <span style={{ color: "#e2a355" }}>
          {[1,2,3,4,4,4].map(i => (
            <iconify-icon key={i} icon="clarity:star-solid" style={{ fontSize: 16, color: "#e2a355" }}></iconify-icon>
          ))}
        </span>
      </div>
      <div style={{ fontSize: 15, color: "#444" }}>
        Đóng gói cẩn thận, chất lượng ổn, sẽ ủng hộ tiếp!
      </div>
      <div style={{ fontSize: 13, color: "#aaa" }}>10/06/2024</div>
    </div>
  </div>
);

export default Review;