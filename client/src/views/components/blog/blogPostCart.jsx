import React from "react";
import { Link } from "react-router-dom";

const BlogPostCard = ({ post }) => (
    <div className="card mb-4 border-0 shadow-sm" style={{ transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'none'}>
        <img src={post.media_id?.file_path} className="card-img-top" alt={post.title} style={{ height: 250, objectFit: 'cover' }} />
        <div className="card-body p-4">
            <h4 className="card-title fw-bold">{post.title}</h4>
            <p className="card-text text-muted">{post.content?.slice(0, 120)}...</p>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <div style={{ fontSize: '0.9em' }}>
                    <span>{post.user_id?.username || "Tác giả"}</span> - <span className="text-muted">{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <Link to={`/blog/${post._id}`} className="btn btn-link text-decoration-none" style={{ color: '#e2a355' }}>
                    Đọc thêm →
                </Link>
            </div>
        </div>
    </div>
);

export default BlogPostCard;
