import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Image } from 'antd';
import item1 from "../../../../assets/images/item8.jpg"; // Thay bằng ảnh thật nếu có
import { apiGetProduct } from "../../../../services/product/product";

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

const Product = ({ onProductData }) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedType, setSelectedType] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const [searchParams] = useSearchParams();

  // Lấy thông tin category từ URL query params
  const categoryName = searchParams.get('category');
  const categorySlug = searchParams.get('categorySlug');

  // Lấy dữ liệu từ API
  const { data: getProduct, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => apiGetProduct({ productId, populate: true }).then(res => res.data),
  });

  // Xử lý dữ liệu sản phẩm
  const product = getProduct?.data;

  // Truyền thông tin sản phẩm lên component cha
  useEffect(() => {
    if (product && onProductData) {
      onProductData(product);
    }
  }, [product, onProductData]);

  if (isLoading) return <div>Đang tải...</div>;
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  // Lấy danh sách variant
  const variants = product.variants || [];

  // Lấy danh sách ảnh tổng
  const images = product.images || [];

  // Lấy tags
  const tags = product.tags || [];

  // Ảnh chính: nếu đã chọn variant thì ưu tiên ảnh của variant, không thì lấy ảnh product
  const mainImages = selectedType
    ? images.filter(img => img.product_variant_id === selectedType)
    : images.filter(img => img.product_id === product._id);

  // Khi chọn variant, set selectedType là _id của variant
  const handleSelectVariant = (variantId) => {
    setSelectedType(variantId);
    setSelectedImg(0);
  };

  // Lấy variant đang chọn
  const selectedVariant = variants.find(v => v._id === selectedType) || variants[0];

  // Ảnh của variant đang chọn
  const variantImages = images.filter(img => img.product_variant_id === selectedVariant?._id);

  // Ảnh hiển thị (ưu tiên ảnh variant, fallback ảnh product)
  const displayImages = variantImages.length > 0 ? variantImages : images.filter(img => img.product_id === product._id);

  return (
    <div className="row">
      {/* Ảnh sản phẩm */}
      <div className="col-md-5">
        <div className="text-center mb-3">
          <Image
            src={displayImages[selectedImg]?.media_id?.file_path || item1}
            alt="main"
            width={320}
            style={{ borderRadius: 12, boxShadow: "0 2px 12px #eee" }}
            fallback={item1}
            preview={true}
          />
        </div>
        <div className="d-flex justify-content-center gap-2">
          {displayImages.map((img, idx) => (
            <Image
              key={img._id}
              src={img.media_id?.file_path || item1}
              alt={`thumb-${idx}`}
              width={60}
              height={60}
              style={{
                objectFit: "cover",
                borderRadius: 8,
                border: selectedImg === idx ? "2px solid #e2a355" : "1px solid #eee",
                cursor: "pointer"
              }}
              onClick={() => setSelectedImg(idx)}
              fallback={item1}
              preview={false}
            />
          ))}
        </div>
      </div>
      {/* Thông tin sản phẩm */}
      <div className="col-md-7">
        <h2 className="fw-bold mb-2">{product.name}</h2>
        <div className="mb-2" style={{ fontSize: 15 }}>
          Thương hiệu: <span style={{ color: "#e2a355" }}>{product.brand_id?.name}</span> &nbsp;|&nbsp;
          Danh mục: <span style={{ color: "#e2a355" }}>{product.category_id?.name}</span> &nbsp;|&nbsp;
          Tình trạng: {selectedVariant?.stock_quantity > 0 ? (
            <span style={{ color: "#2ecc40" }}>Còn hàng</span>
          ) : (
            <span style={{ color: "#ff4d2d" }}>Hết hàng</span>
          )}
        </div>
        <div className="mb-2" style={{ fontSize: 15 }}>
          Giá: <b style={{ color: "#e2a355" }}>${selectedVariant?.price || product.base_price}</b>
        </div>
        <div className="mb-2">
          <span style={{ color: "#e2a355" }}>
            {[1,2,3,4,5].map(i => (
              <iconify-icon key={i} icon="clarity:star-solid" class="text-primary" style={{ color: "#e2a355", fontSize: 18 }}></iconify-icon>
            ))}
          </span>
        </div>
        <div className="mb-3" style={{ fontSize: 15, color: "#444" }}>
          <span role="img" aria-label="dog">🐶</span> {product.description}
        </div>
        {/* Hiển thị các loại variant */}
        <div className="mb-2" style={{ fontSize: 15 }}>
          <span className="fw-bold">Loại:</span>
          <div className="d-flex flex-wrap gap-2 mt-2">
            {variants.map(variant => (
              <button
                key={variant._id}
                className="btn"
                style={{
                  border: selectedType === variant._id ? "2px solid #e2a355" : "1px solid #ddd",
                  background: selectedType === variant._id ? "#fff7ea" : "#fff",
                  color: "#e2a355",
                  fontWeight: 600,
                  borderRadius: 8,
                  padding: "6px 16px"
                }}
                onClick={() => handleSelectVariant(variant._id)}
              >
                {variant.attributes.map(attr => attr.attribute_value_id?.value).join(' / ')}
              </button>
            ))}
          </div>
        </div>
        {/* Hiển thị tags */}
        <div className="mb-2">
          <span className="fw-bold">Tags:</span>
          {tags.map(tag => (
            <span key={tag._id} className="badge bg-warning text-dark ms-2">
              {tag.tag_id?.name}
            </span>
          ))}
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