import React from "react";
import { Link } from "react-router-dom";

// --- DỮ LIỆU MẪU CHO BLOG ---
const blogPosts = [
  {
    id: 1,
    title: "10 Dấu hiệu cho thấy chú chó của bạn đang hạnh phúc",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop",
    category: "Chăm sóc chó",
    excerpt: "Bạn có bao giờ tự hỏi liệu chú chó của mình có thực sự hạnh phúc không? Hãy cùng tìm hiểu những dấu hiệu rõ ràng nhất...",
    author: "Dr. Thú Y",
    date: "15/06/2024",
  },
  {
    id: 2,
    title: "Dinh dưỡng đúng cách cho mèo con: Những điều cần biết",
    image: "https://images.unsplash.com/photo-1574158622682-e40e6984100d?q=80&w=2080&auto=format&fit=crop",
    category: "Chăm sóc mèo",
    excerpt: "Giai đoạn đầu đời rất quan trọng. Cung cấp dinh dưỡng đầy đủ sẽ giúp mèo con của bạn phát triển khỏe mạnh và toàn diện.",
    author: "Admin",
    date: "12/06/2024",
  },
  {
    id: 3,
    title: "Cách huấn luyện chó đi vệ sinh đúng chỗ hiệu quả",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1924&auto=format&fit=crop",
    category: "Huấn luyện",
    excerpt: "Huấn luyện chó đi vệ sinh là một trong những bài học đầu tiên và quan trọng nhất. Cùng xem các mẹo hữu ích nhé!",
    author: "Chuyên gia huấn luyện",
    date: "10/06/2024",
  },
  {
    id: 4,
    title: "Top 5 loại đồ chơi an toàn và thú vị cho thú cưng",
    image: "https://images.unsplash.com/photo-1598875184988-5e67b1a874b8?q=80&w=1964&auto=format&fit=crop",
    category: "Đời sống",
    excerpt: "Đồ chơi không chỉ giúp giải trí mà còn kích thích trí thông minh của thú cưng. Đâu là lựa chọn tốt nhất?",
    author: "Admin",
    date: "08/06/2024",
  },
];

const categories = ["Chăm sóc chó", "Chăm sóc mèo", "Huấn luyện", "Dinh dưỡng", "Sức khỏe", "Đời sống"];

// --- COMPONENT THẺ BÀI VIẾT ---
const BlogPostCard = ({ post }) => (
    <div className="card mb-4 border-0 shadow-sm" style={{ transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'none'}>
        <img src={post.image} className="card-img-top" alt={post.title} style={{ height: 250, objectFit: 'cover' }} />
        <div className="card-body p-4">
            <p className="text-uppercase" style={{ color: '#e2a355', fontSize: '0.8em', fontWeight: 'bold' }}>{post.category}</p>
            <h4 className="card-title fw-bold">{post.title}</h4>
            <p className="card-text text-muted">{post.excerpt}</p>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <div style={{ fontSize: '0.9em' }}>
                    <span>{post.author}</span> - <span className="text-muted">{post.date}</span>
                </div>
                <Link to={`/blog/${post.id}`} className="btn btn-link text-decoration-none" style={{ color: '#e2a355' }}>
                    Đọc thêm →
                </Link>
            </div>
        </div>
    </div>
);

// --- COMPONENT SIDEBAR ---
const BlogSidebar = () => (
    <div className="p-4 rounded" style={{ background: '#f8f9fa' }}>
        {/* Search */}
        <div className="mb-4">
            <h5 className="fw-bold mb-3">Tìm kiếm</h5>
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Nhập từ khóa..." />
                <button className="btn" style={{ background: '#e2a355', color: 'white' }}>Go</button>
            </div>
        </div>

        {/* Categories */}
        <div className="mb-4">
            <h5 className="fw-bold mb-3">Danh mục</h5>
            <ul className="list-unstyled">
                {categories.map(cat => (
                    <li key={cat} className="mb-2">
                        <Link to="#" className="text-decoration-none text-dark">{cat}</Link>
                    </li>
                ))}
            </ul>
        </div>
        
        {/* Recent Posts */}
        <div>
            <h5 className="fw-bold mb-3">Bài viết mới nhất</h5>
            <ul className="list-unstyled">
                {blogPosts.slice(0, 3).map(post => (
                    <li key={post.id} className="d-flex mb-3">
                        <img src={post.image} alt={post.title} style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 8 }}/>
                        <div className="ms-3">
                            <Link to={`/blog/${post.id}`} className="text-decoration-none text-dark fw-bold" style={{fontSize: '0.9em'}}>{post.title}</Link>
                            <p className="text-muted" style={{fontSize: '0.8em'}}>{post.date}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

// --- TRANG BLOG CHÍNH ---
const Blog = () => {
    return (
        <div className="bg-white">
            {/* Hero Banner */}
            <div className="text-center py-5" style={{ background: 'linear-gradient(to right, #fff7ea, #fff0d6)' }}>
                <h1 className="display-4 fw-bold" style={{ color: '#e2a355' }}>Góc Chăm Sóc Thú Cưng</h1>
                <p className="lead text-muted">Cập nhật những kiến thức, mẹo vặt và tin tức mới nhất về thế giới thú cưng.</p>
            </div>

            <div className="container py-5">
                <div className="row">
                    {/* Main Content */}
                    <div className="col-lg-8">
                        {blogPosts.map(post => (
                            <BlogPostCard key={post.id} post={post} />
                        ))}

                        {/* Pagination */}
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center">
                                <li className="page-item disabled"><a className="page-link" href="#">Trước</a></li>
                                <li className="page-item active"><a className="page-link" href="#" style={{background: '#e2a355', borderColor: '#e2a355'}}>1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" href="#">Sau</a></li>
                            </ul>
                        </nav>
                    </div>

                    {/* Sidebar */}
                    <div className="col-lg-4">
                        <BlogSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;