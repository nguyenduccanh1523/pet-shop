import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import BlogPostCard from "../components/blog/blogPostCart";
import BlogSidebar from "../components/blog/blogSidebar";
import { apiGetAllBlog } from "../../services/blog/blog";
import { apiGetBlogCategory } from "../../services/blog/blogCategory";
import LoadingSpinner from "../components/loading/loading";


// --- TRANG BLOG CHÍNH ---
const Blog = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Lấy danh mục (có kèm blog trong từng category)
  const { data: categoryData, isLoading, isError } = useQuery({
    queryKey: ['blogCategory'],
    queryFn: () => apiGetBlogCategory().then(res => res.data),
  });
  const categories = categoryData?.data || [];

  // Tìm category hiện tại theo slug
  const currentCategory = useMemo(() => {
    if (!categorySlug) return null;
    return categories.find(cat =>
      (cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')) === categorySlug
    );
  }, [categories, categorySlug]);

  // Gom blog theo category hoặc toàn bộ
  const allBlogs = useMemo(() => {
    if (!categories.length) return [];
    if (currentCategory) {
      return currentCategory.blogs || [];
    }
    // Gom toàn bộ blog từ tất cả category
    return categories.flatMap(cat => cat.blogs || []);
  }, [categories, currentCategory]);

  // Sắp xếp blog mới nhất lên đầu
  const sortedBlogs = useMemo(() => {
    return [...allBlogs].sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
  }, [allBlogs]);

  // Phân trang
  const pagedBlogs = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedBlogs.slice(start, start + pageSize);
  }, [sortedBlogs, page, pageSize]);

  const pageCount = Math.ceil(sortedBlogs.length / pageSize);

  // Khi đổi danh mục thì reset về trang 1
  React.useEffect(() => {
    setPage(1);
  }, [categorySlug]);

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <div className="text-center py-5" style={{ background: 'linear-gradient(to right, #fff7ea, #fff0d6)' }}>
        <h1 className="display-4 fw-bold" style={{ color: '#e2a355' }}>Góc Chăm Sóc Thú Cưng</h1>
        <p className="lead text-muted">Cập nhật những kiến thức, mẹo vặt và tin tức mới nhất về thế giới thú cưng.</p>
      </div>

      {/* Breadcrumb */}
      <div className="container pt-3 pb-0">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
            <li className="breadcrumb-item"><a href="/blog">Blog</a></li>
            {currentCategory && (
              <li className="breadcrumb-item active" aria-current="page">{currentCategory.name}</li>
            )}
          </ol>
        </nav>
      </div>

      <div className="container py-5">
        <div className="row">
          {/* Main Content */}
          <div className="col-lg-8">
            {isLoading && <LoadingSpinner />}
            {isError && <div>Lỗi khi tải blog!</div>}
            {!isLoading && pagedBlogs.map(post => (
              <BlogPostCard key={post._id} post={post} />
            ))}

            {/* Pagination */}
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage(page - 1)} disabled={page === 1}>Trước</button>
                </li>
                {Array.from({ length: pageCount || 1 }, (_, i) => (
                  <li key={i + 1} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${page === pageCount ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage(page + 1)} disabled={page === pageCount}>Sau</button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <BlogSidebar
              categories={categories.map(cat => ({
                ...cat,
                slug: cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
              }))}
              currentCategory={currentCategory}
              onCategoryClick={cat => navigate(`/blog/category/${cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`)}
              blogPosts={sortedBlogs}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;