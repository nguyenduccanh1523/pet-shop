import React, { useState } from "react";

const ArrowIcon = ({ open }) => (
  <span style={{
    display: "inline-block",
    transition: "transform 0.2s",
    transform: open ? "rotate(90deg)" : "rotate(0deg)",
    marginLeft: 8,
    fontSize: 13,
    color: '#888'
  }}>
    ▶
  </span>
);

const categories = [
  { key: "new", label: "Sản Phẩm Mới" },
  {
    key: "dog",
    label: "Dành cho chó",
    children: [
      { key: "dog-food", label: "Thức Ăn Chó" },
      { key: "dog-nutrition", label: "Bổ sung dinh dưỡng" },
      { key: "dog-toy", label: "Đồ chơi, Huấn luyện" },
      { key: "dog-accessory", label: "Đồ dùng cho chó" }
    ]
  },
  { key: "cat", label: "Dành cho mèo" },
  { key: "accessory", label: "Dây dắt, phụ kiện" },
  { key: "clothes", label: "Quần áo" },
  { key: "bowl", label: "Bát bình chứa đựng" },
  { key: "transport", label: "Đồ vận chuyển, nuôi nhốt" },
  { key: "bath", label: "Sữa tắm, Khử mùi" },
  { key: "care", label: "Hỗ trợ chăm sóc" },
  { key: "nutrition", label: "Bổ sung dinh dưỡng" },
  { key: "vet", label: "Thú Y" }
];

const priceRanges = [
  "Dưới 50.000đ-100.000đ",
  "100.000đ-200.000đ",
  "200.000đ-300.000đ",
  "Trên 300.000đ"
];

const sidebarStyle = {
  minWidth: 240,
  background: "#fff",
  borderRadius: 14,
  boxShadow: "0 4px 24px rgba(0,0,0,0.09)",
  padding: "28px 18px 18px 18px",
  fontFamily: "inherit",
  maxHeight: '85vh',
  overflowY: 'auto',
  border: '1px solid #f0f0f0'
};

const ShopSidebar = ({ onCategoryClick, onClose }) => {
  const [openKeys, setOpenKeys] = useState([]);

  const handleToggle = (key) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <aside style={sidebarStyle}>
      <div className="mb-4 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="pet"
          style={{ width: 80, marginBottom: 8, borderRadius: 16, boxShadow: '0 2px 8px #eee' }}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0" style={{ textTransform: 'uppercase', fontSize: 16, letterSpacing: 1, color: '#e2a355' }}>Danh mục sản phẩm</h6>
        <button className="btn btn-sm" onClick={onClose} style={{ borderRadius: '50%', background: '#f5f5f5', width: 28, height: 28, padding: 0, fontSize: 16, lineHeight: '28px', color: '#888', border: 'none' }}>✕</button>
      </div>
      <ul className="list-unstyled mb-4" style={{ paddingLeft: 0 }}>
        {categories.map((cat) => (
          <li
            key={cat.key}
            className="mb-1"
            style={{
              borderRadius: 8,
              background: openKeys.includes(cat.key) ? "#fff7ea" : "transparent",
              transition: "background 0.2s"
            }}
          >
            <div
              onClick={() => cat.children ? handleToggle(cat.key) : onCategoryClick(cat.key)}
              style={{
                fontWeight: cat.children ? 600 : 400,
                color: cat.children ? "#e2a355" : "#222",
                padding: "10px 14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 8,
                userSelect: "none",
                fontSize: 15,
                boxShadow: openKeys.includes(cat.key) ? '0 2px 8px #fbe6c2' : 'none',
                outline: 'none',
                transition: 'box-shadow 0.2s, background 0.2s'
              }}
              className="sidebar-category-item"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  cat.children ? handleToggle(cat.key) : onCategoryClick(cat.key);
                }
              }}
              onMouseOver={e => e.currentTarget.style.background = "#fff3e0"}
              onMouseOut={e => e.currentTarget.style.background = openKeys.includes(cat.key) ? "#fff7ea" : "transparent"}
            >
              <span>{cat.label}</span>
              {cat.children && <ArrowIcon open={openKeys.includes(cat.key)} />}
            </div>
            {cat.children && openKeys.includes(cat.key) && (
              <ul className="list-unstyled ms-2 mt-1 mb-2" style={{ paddingLeft: 10 }}>
                {cat.children.map((child) => (
                  <li
                    key={child.key}
                    style={{
                      cursor: 'pointer',
                      fontWeight: 400,
                      color: "#444",
                      padding: "7px 18px",
                      borderRadius: 6,
                      marginBottom: 2,
                      fontSize: 14,
                      transition: "background 0.15s"
                    }}
                    className="sidebar-category-child"
                    onClick={() => onCategoryClick(child.key)}
                    onMouseOver={e => e.currentTarget.style.background = "#fbe6c2"}
                    onMouseOut={e => e.currentTarget.style.background = "transparent"}
                  >
                    • {child.label}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <h6 className="fw-bold mb-2" style={{ textTransform: 'uppercase', fontSize: 15, letterSpacing: 1, color: '#e2a355' }}>Giá sản phẩm</h6>
      <ul className="list-unstyled" style={{ paddingLeft: 0 }}>
        {priceRanges.map((pr, idx) => (
          <li
            key={idx}
            className="mb-2"
            style={{
              cursor: 'pointer',
              color: "#555",
              padding: "8px 14px",
              borderRadius: 6,
              fontSize: 14,
              transition: "background 0.15s"
            }}
            onMouseOver={e => e.currentTarget.style.background = "#fbe6c2"}
            onMouseOut={e => e.currentTarget.style.background = "transparent"}
          >
            {pr}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ShopSidebar; 