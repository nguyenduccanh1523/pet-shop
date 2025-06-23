import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../loading/loading";
import { apiGetBlog, apiGetAllBlog } from "../../../services/blog/blog";
import { Image, Tag, Avatar, Button, Input, Divider, Space } from 'antd';
import { 
  CalendarOutlined, 
  UserOutlined, 
  EyeOutlined, 
  LikeOutlined, 
  ShareAltOutlined,
  MessageOutlined,
  BookOutlined,
  HeartOutlined,
  HeartFilled
} from '@ant-design/icons';

const { TextArea } = Input;




const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");

  // Lấy dữ liệu blog chi tiết từ API
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogDetail", id],
    queryFn: () => apiGetBlog({ blogId: id }).then(res => res.data),
    enabled: !!id
  });
  const blog = data?.data || {};

  // Lấy tất cả blog để làm bài viết liên quan và phổ biến
  const { data: allBlogData } = useQuery({
    queryKey: ["allBlogsForRelated"],
    queryFn: () => apiGetAllBlog(1, 12).then(res => res.data),
  });
  const allBlogs = allBlogData?.data?.filter(b => b._id !== id) || [];
  const relatedPosts = allBlogs.slice(0, 3);
  const popularPosts = allBlogs.slice(3, 6);

  const handleLike = () => setLiked(!liked);
  const handleComment = () => {
    if (comment.trim()) {
      setComment("");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError || !blog) return <div className="text-center py-5">Không tìm thấy bài viết!</div>;

  // Hàm xử lý khi click bài viết liên quan hoặc phổ biến
  const handlePostClick = (postId) => {
    navigate(`/blog/${postId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb Navigation */}
      <div className="container py-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">Trang chủ</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/blog" className="text-decoration-none">Blog</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {blog.title || `Bài viết #${id}`}
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="d-flex justify-content-center align-items-center" style={{ background: '#f5f5f5', minHeight: 380, padding: '32px 0' }}>
        <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 32px rgba(0,0,0,0.08)', background: '#fff', maxWidth: 900, width: '100%' }}>
          <Image
            src={blog.media_id?.file_path}
            alt={blog.title}
            style={{
              width: '100%',
              height: 380,
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              borderRadius: 0
            }}
            preview={false}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.32)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            textAlign: 'center',
            padding: 24
          }}>
            {blog.blog_category_id?.name && (
              <Tag color="#e2a355" style={{ fontSize: '14px', padding: '4px 12px', marginBottom: '16px' }}>
                {blog.blog_category_id.name}
              </Tag>
            )}
            <h1 className="display-4 fw-bold mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              {blog.title}
            </h1>
            <div className="d-flex align-items-center justify-content-center gap-4">
              <Space>
                <Avatar src={blog.user_id?.avatar_id?.file_path} size="small" />
                <span>{blog.user_id?.username || "Tác giả"}</span>
              </Space>
              <Space>
                <CalendarOutlined />
                <span>{blog.created_at ? new Date(blog.created_at).toLocaleDateString() : ""}</span>
              </Space>
              <Space>
                <BookOutlined />
                <span>{blog.read_time} đọc</span>
              </Space>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          {/* Main Content */}
          <div className="col-lg-8">
            {/* Article Content */}
            <div className="bg-white rounded shadow-sm p-5 mb-4">
              {/* Tags */}
              <div className="mb-4">
                {(blog.tags || []).map(tag => (
                  <Tag key={tag._id || tag} color="gold" style={{ marginBottom: '8px' }}>
                    #{tag.name || tag}
                  </Tag>
                ))}
              </div>

              {/* Content */}
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
                style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: '#333'
                }}
              />

              {/* Action Buttons */}
              <Divider />
              <div className="d-flex justify-content-between align-items-center">
                <Space>
                  
                  <Button icon={<ShareAltOutlined />}>
                    Chia sẻ
                  </Button>
                </Space>
                <Space>
                  <Link to="/blog">
                    <Button type="default" style={{ borderColor: '#e2a355', color: '#e2a355' }}>
                      ← Quay lại Blog
                    </Button>
                  </Link>
                  <EyeOutlined />
                  {/* <span>{blog.views} lượt xem</span> */}
                </Space>
              </div>
            </div>


            {/* Related Posts */}
            <div className="bg-white rounded shadow-sm p-5">
              <h4 className="fw-bold mb-4">Bài viết liên quan</h4>
              <div className="row">
                {relatedPosts.map(post => (
                  <div key={post._id} className="col-md-6 mb-3">
                    <div className="text-decoration-none" style={{ cursor: 'pointer' }} onClick={() => handlePostClick(post._id)}>
                      <div className="card border-0 shadow-sm" style={{ transition: 'transform 0.2s' }}>
                        <Image
                          src={post.media_id?.file_path}
                          alt={post.title}
                          style={{ height: '150px', objectFit: 'cover' }}
                          preview={false}
                        />
                        <div className="card-body">
                          <h6 className="card-title fw-bold text-dark">{post.title}</h6>
                          <small className="text-muted">{post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <Link to="/blog">
                  <Button 
                    type="primary" 
                    size="large"
                    style={{ background: '#e2a355', borderColor: '#e2a355' }}
                  >
                    Xem tất cả bài viết
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: '20px' }}>
              {/* Author Info */}
              <div className="bg-white rounded shadow-sm p-4 mb-4">
                <h5 className="fw-bold mb-3">Về tác giả</h5>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <Avatar src={blog.user_id?.avatar_id?.file_path} size={64} />
                  <div>
                    <h6 className="fw-bold mb-1">{blog.user_id?.username || "Tác giả"}</h6>
                    <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
                      Bác sĩ thú y với 10 năm kinh nghiệm
                    </p>
                  </div>
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-white rounded shadow-sm p-4 mb-4">
                <h5 className="fw-bold mb-3">Bài viết phổ biến</h5>
                {popularPosts.map(post => (
                  <div key={post._id} className="d-flex gap-3 mb-3" style={{ cursor: 'pointer' }} onClick={() => handlePostClick(post._id)}>
                    <Image
                      src={post.media_id?.file_path}
                      alt={post.title}
                      style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                      preview={false}
                    />
                    <div>
                      <h6 className="fw-bold text-dark" style={{ fontSize: '14px', lineHeight: '1.4' }}>{post.title}</h6>
                      <small className="text-muted">{post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}</small>
                    </div>
                  </div>
                ))}
              </div>

              {/* Newsletter */}
              <div className="bg-white rounded shadow-sm p-4">
                <h5 className="fw-bold mb-3">Đăng ký nhận tin</h5>
                <p className="text-muted mb-3" style={{ fontSize: '14px' }}>
                  Nhận những bài viết mới nhất về chăm sóc thú cưng
                </p>
                <Input placeholder="Email của bạn" className="mb-3" />
                <Button type="primary" block style={{ background: '#e2a355', borderColor: '#e2a355' }}>
                  Đăng ký
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 