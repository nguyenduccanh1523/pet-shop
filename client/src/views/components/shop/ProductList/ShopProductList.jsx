import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { Pagination, Select, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { apiGetProductCategory } from "../../../../services/product/productCategory";
import { apiGetAllProduct } from "../../../../services/product/product";
import item8 from "../../../../assets/images/item8.jpg"
import './ShopProductList.css';
import LoadingSpinner from '../../loading/loading';

const { Option } = Select;

const ShopProductList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [sort, setSort] = useState("created_at:desc");
    const [keyword, setKeyword] = useState("");
    const { categorySlug } = useParams();
    
    const navigate = useNavigate();

    // Lấy dữ liệu categories với products
    const { data: productCategory, isLoading: categoryLoading } = useQuery({
        queryKey: ['productCategory'],
        queryFn: () => apiGetProductCategory({ populate: true }).then(res => res.data),
    });

    // Tìm category dựa trên slug
    const findCategoryBySlug = (slug) => {
        if (!productCategory?.data) return null;
        
        // Tìm trong parent categories
        let category = productCategory.data.find(cat => 
            cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
        );
        
        // Nếu không tìm thấy, tìm trong children
        if (!category) {
            for (const parentCat of productCategory.data) {
                if (parentCat.children) {
                    category = parentCat.children.find(child => 
                        child.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
                    );
                    if (category) break;
                }
            }
        }
        
        return category;
    };

    const currentCategory = findCategoryBySlug(categorySlug);

    // Lấy dữ liệu sản phẩm từ API
    const { data: productsData, isLoading: productsLoading } = useQuery({
        queryKey: ['products', currentPage, pageSize, sort, keyword, currentCategory?._id],
        queryFn: () => apiGetAllProduct({
            page: currentPage,
            pageSize: pageSize,
            keyword: keyword,
            category_id: currentCategory?._id,
            sort: sort
        }).then(res => res.data),
        enabled: !categoryLoading
    });

    const products = productsData?.data || [];
    const pagination = productsData?.meta?.pagination;

    const getCategoryLabel = () => {
        if (!categorySlug) return "Tất cả sản phẩm";
        return currentCategory?.name || "Danh mục";
    };

    // Xử lý click vào sản phẩm
    const handleProductClick = (product) => {
        const productId = product._id || product.id;
        
        // Tạo URL với query params để truyền thông tin category
        const params = new URLSearchParams();
        if (currentCategory) {
            params.append('category', currentCategory.name);
            params.append('categorySlug', currentCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
        }
        
        const queryString = params.toString();
        const url = queryString ? `/product/${productId}?${queryString}` : `/product/${productId}`;
        
        navigate(url);
    };

    // Xử lý thay đổi trang
    const handlePageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
    };

    // Xử lý thay đổi sắp xếp
    const handleSortChange = (value) => {
        setSort(value);
        setCurrentPage(1); // Reset về trang đầu
    };

    // Xử lý tìm kiếm
    const handleSearch = (value) => {
        setKeyword(value);
        setCurrentPage(1); // Reset về trang đầu
    };

    const isLoading = categoryLoading || productsLoading;

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                        <li className="breadcrumb-item"><Link to="/shop">Cửa hàng</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {getCategoryLabel()}
                        </li>
                    </ol>
                </nav>
                <Space>
                    <Input
                        placeholder="Tìm kiếm sản phẩm..."
                        prefix={<SearchOutlined />}
                        value={keyword}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 250 }}
                        allowClear
                    />
                    <Select
                        value={sort}
                        onChange={handleSortChange}
                        style={{ width: 150 }}
                    >
                        <Option value="created_at:desc">Mới nhất</Option>
                        <Option value="created_at:asc">Cũ nhất</Option>
                        <Option value="base_price:asc">Giá tăng dần</Option>
                        <Option value="base_price:desc">Giá giảm dần</Option>
                        <Option value="name:asc">Tên A-Z</Option>
                        <Option value="name:desc">Tên Z-A</Option>
                    </Select>
                </Space>
            </div>

            {isLoading ? (
                <LoadingSpinner />
            ) : categorySlug && !currentCategory ? (
                <div className="text-center py-5">
                    <h4 className="text-muted">Không tìm thấy danh mục</h4>
                    <p className="text-muted">Danh mục bạn đang tìm kiếm không tồn tại.</p>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-5">
                    <h4 className="text-muted">Không có sản phẩm</h4>
                    <p className="text-muted">
                        {categorySlug 
                            ? `Danh mục "${currentCategory?.name}" hiện chưa có sản phẩm nào.`
                            : "Không tìm thấy sản phẩm phù hợp với tiêu chí tìm kiếm."
                        }
                    </p>
                </div>
            ) : (
                <>
                    <div className="row shop-product-list" style={{ rowGap: 32 }}>
                        {products.map((product) => (
                            <div className="col-md-3 mb-4" key={product._id}>
                                <div 
                                    className="card position-relative h-100"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleProductClick(product)}
                                    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    {product.tags && product.tags.length > 0 && (
                                        <div className="product-sale-badge z-1 position-absolute rounded-3 m-2 px-2">
                                            {product.tags[0]?.tag_id?.name || product.tags[0]?.name}
                                        </div>
                                    )}
                                    <img src={ product.images?.[0]?.media_id?.file_path || item8} className="card-img-top" alt={product.name} />
                                    <div className="card-body d-flex flex-column p-3">
                                        <div>
                                            <h3 className="product-title">{product.name}</h3>
                                            <div className="rating secondary-font my-2">
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                <iconify-icon icon="clarity:star-solid" className="text-primary"></iconify-icon>
                                                5.0
                                            </div>
                                            <h3 className="product-price secondary-font">
                                                ${(product.base_price || product.price)?.toLocaleString()}
                                                {product.oldPrice && (
                                                    <span className="old-price">
                                                        ${product.oldPrice.toLocaleString()}
                                                    </span>
                                                )}
                                            </h3>
                                        </div>
                                        <div className="d-flex mt-auto pt-3">
                                            <button 
                                                className="btn-cart flex-grow-1 me-2"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Xử lý thêm vào giỏ hàng
                                                }}
                                            >
                                                ADD TO CART
                                            </button>
                                            <button 
                                                className="btn-wishlist"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Xử lý thêm vào yêu thích
                                                }}
                                            >
                                                <iconify-icon icon="fluent:heart-28-filled" className="fs-5"></iconify-icon>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Phân trang */}
                    {pagination && pagination.total > pageSize && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                current={currentPage}
                                total={pagination.total}
                                pageSize={pageSize}
                                showSizeChanger
                                showQuickJumper
                                showTotal={(total, range) => 
                                    `${range[0]}-${range[1]} của ${total} sản phẩm`
                                }
                                onChange={handlePageChange}
                                onShowSizeChange={handlePageChange}
                                pageSizeOptions={['12', '24', '48', '96']}
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default ShopProductList; 