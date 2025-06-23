import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BlogSidebar = ({ blogPosts, categories, currentCategory, onCategoryClick }) => {
  const navigate = useNavigate();

  return (
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
                    <li key={cat._id} className="mb-2">
                        <Link
                            to={`/blog/category/${cat.slug}`}
                            className={`text-decoration-none text-dark${currentCategory?._id === cat._id ? ' fw-bold' : ''}`}
                            onClick={e => {
                                e.preventDefault();
                                onCategoryClick(cat);
                            }}
                        >
                            {cat.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        
        {/* Recent Posts */}
        <div>
            <h5 className="fw-bold mb-3">Bài viết mới nhất</h5>
            <ul className="list-unstyled">
                {blogPosts.slice(0, 3).map(post => (
                    <li key={post._id} className="d-flex mb-3">
                        <img src={post.media_id?.file_path} alt={post.title} style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 8 }}/>
                        <div className="ms-3">
                            <Link to={`/blog/${post.slug}`} className="text-decoration-none text-dark fw-bold" style={{fontSize: '0.9em'}}>{post.title}</Link>
                            <p className="text-muted" style={{fontSize: '0.8em'}}>{new Date(post.published_at).toLocaleDateString()}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );
};

export default BlogSidebar;
