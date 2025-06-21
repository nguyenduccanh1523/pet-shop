import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiGetProductCategory } from "../../../../services/product/productCategory";
import LoadingSpinner from '../../loading/loading';

const ArrowIcon = ({ open }) => (
  <span style={{
    display: "inline-block",
    transition: "transform 0.2s",
    transform: open ? "rotate(90deg)" : "rotate(0deg)",
    marginLeft: 8,
    fontSize: 13,
    color: '#e2a355'
  }}>
    ▶
  </span>
);

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
  const navigate = useNavigate();

  const { data: productCategory, isLoading: isproductCategoryLoading } = useQuery({
    queryKey: ['productCategory'],
    queryFn: () => apiGetProductCategory({ populate: true }).then(res => res.data),
  });


  const handleToggle = (categoryId) => {
    setOpenKeys((prev) => {
      const isOpen = prev.includes(categoryId);
      if (isOpen) {
        // Đóng danh mục
        return prev.filter((k) => k !== categoryId);
      } else {
        // Mở danh mục
        return [...prev, categoryId];
      }
    });
  };

  // Kiểm tra xem danh mục có con hay không
  const hasChildren = (category) => {
    return category.children && category.children.length > 0;
  };

  // Xử lý click vào category
  const handleCategoryClick = (category) => {
    // Tạo slug từ tên category
    const slug = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Navigate đến trang category
    navigate(`/shop/${slug}`);
    
    // Gọi callback nếu có
    if (onCategoryClick) {
      onCategoryClick(category);
    }
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
      
      {isproductCategoryLoading ? (
        <LoadingSpinner />
      ) : (
        <ul className="list-unstyled mb-4" style={{ paddingLeft: 0 }}>
          {productCategory?.data?.map((cat) => (
            <li
              key={cat._id}
              className="mb-1"
              style={{
                borderRadius: 8,
                background: openKeys.includes(cat._id) ? "#fff7ea" : "transparent",
                transition: "background 0.2s"
              }}
            >
              <div
                onClick={() => hasChildren(cat) ? handleToggle(cat._id) : handleCategoryClick(cat)}
                style={{
                  fontWeight: hasChildren(cat) ? 600 : 400,
                  color: hasChildren(cat) ? "#e2a355" : "#222",
                  padding: "10px 14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 8,
                  userSelect: "none",
                  fontSize: 15,
                  boxShadow: openKeys.includes(cat._id) ? '0 2px 8px #fbe6c2' : 'none',
                  outline: 'none',
                  transition: 'box-shadow 0.2s, background 0.2s'
                }}
                className="sidebar-category-item"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    hasChildren(cat) ? handleToggle(cat._id) : handleCategoryClick(cat);
                  }
                }}
                onMouseOver={e => e.currentTarget.style.background = "#fff3e0"}
                onMouseOut={e => e.currentTarget.style.background = openKeys.includes(cat._id) ? "#fff7ea" : "transparent"}
              >
                <span>{cat.name}</span>
                {hasChildren(cat) && <ArrowIcon open={openKeys.includes(cat._id)} />}
              </div>
              {hasChildren(cat) && openKeys.includes(cat._id) && (
                <ul className="list-unstyled ms-2 mt-1 mb-2" style={{ paddingLeft: 10 }}>
                  {cat.children.map((child) => (
                    <li
                      key={child._id}
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
                      onClick={() => handleCategoryClick(child)}
                      onMouseOver={e => e.currentTarget.style.background = "#fbe6c2"}
                      onMouseOut={e => e.currentTarget.style.background = "transparent"}
                    >
                      • {child.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
      
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