import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
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

// Dữ liệu mẫu cho bài viết chi tiết
const blogDetail = {
  id: 1,
  title: "10 Dấu hiệu cho thấy chú chó của bạn đang hạnh phúc",
  image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop",
  category: "Chăm sóc chó",
  author: "Dr. Thú Y",
  authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
  date: "15/06/2024",
  readTime: "8 phút đọc",
  views: 1247,
  likes: 89,
  tags: ["Chó", "Hạnh phúc", "Chăm sóc", "Tâm lý"],
  content: `
    <p>Bạn có bao giờ tự hỏi liệu chú chó của mình có thực sự hạnh phúc không? Những người nuôi thú cưng thường quan tâm đến sức khỏe thể chất của chó, nhưng sức khỏe tinh thần cũng quan trọng không kém. Dưới đây là 10 dấu hiệu rõ ràng nhất cho thấy chú chó của bạn đang sống một cuộc sống hạnh phúc và viên mãn.</p>

    <h3>1. Đuôi vẫy liên tục</h3>
    <p>Đuôi vẫy là dấu hiệu phổ biến nhất của sự hạnh phúc ở chó. Khi chó vẫy đuôi, đặc biệt là khi gặp bạn sau một ngày dài, điều đó có nghĩa là chúng rất vui mừng và hạnh phúc khi được ở bên bạn.</p>

    <h3>2. Mắt sáng và biểu cảm</h3>
    <p>Chó hạnh phúc thường có đôi mắt sáng, linh hoạt và thể hiện nhiều cảm xúc. Bạn có thể thấy sự tò mò, vui vẻ và tình yêu thương trong ánh mắt của chúng.</p>

    <h3>3. Ăn uống ngon miệng</h3>
    <p>Một chú chó hạnh phúc sẽ có cảm giác thèm ăn tốt và ăn uống một cách nhiệt tình. Nếu chó của bạn ăn ngon miệng, đó là dấu hiệu tốt về sức khỏe tinh thần.</p>

    <h3>4. Ngủ ngon và sâu</h3>
    <p>Chó hạnh phúc thường ngủ ngon và sâu giấc. Chúng có thể ngủ ở nhiều tư thế khác nhau và thường ngủ gần chủ nhân của mình.</p>

    <h3>5. Chơi đùa nhiệt tình</h3>
    <p>Chó hạnh phúc rất thích chơi đùa và tương tác với chủ nhân. Chúng sẽ mang đồ chơi đến cho bạn, chạy nhảy xung quanh và thể hiện sự nhiệt tình trong các hoạt động.</p>

    <h3>6. Thích được vuốt ve</h3>
    <p>Chó hạnh phúc thường tìm kiếm sự tiếp xúc thể chất với chủ nhân. Chúng sẽ tựa vào bạn, yêu cầu được vuốt ve và thể hiện sự thoải mái khi được chạm vào.</p>

    <h3>7. Học hỏi nhanh</h3>
    <p>Chó hạnh phúc thường có khả năng học hỏi tốt hơn. Chúng sẽ phản ứng tích cực với việc huấn luyện và thích thú khi học những điều mới.</p>

    <h3>8. Giao tiếp xã hội tốt</h3>
    <p>Chó hạnh phúc thường thân thiện với những con chó khác và con người. Chúng sẽ không quá hung hăng hoặc sợ hãi khi gặp người lạ.</p>

    <h3>9. Có thói quen sinh hoạt đều đặn</h3>
    <p>Chó hạnh phúc thường có thói quen sinh hoạt đều đặn và có thể dự đoán được. Chúng sẽ ăn, ngủ và chơi đùa vào những thời điểm nhất định trong ngày.</p>

    <h3>10. Thể hiện sự tò mò</h3>
    <p>Chó hạnh phúc thường tò mò về môi trường xung quanh. Chúng sẽ khám phá những điều mới và thể hiện sự quan tâm đến thế giới xung quanh.</p>

    <h3>Kết luận</h3>
    <p>Nhận biết những dấu hiệu hạnh phúc ở chó không chỉ giúp bạn hiểu rõ hơn về thú cưng của mình mà còn giúp bạn đảm bảo rằng chúng đang sống một cuộc sống chất lượng. Hãy luôn quan tâm đến cả sức khỏe thể chất và tinh thần của chú chó yêu quý của bạn.</p>
  `,
  relatedPosts: [
    {
      id: 2,
      title: "Dinh dưỡng đúng cách cho mèo con: Những điều cần biết",
      image: "https://images.unsplash.com/photo-1574158622682-e40e6984100d?q=80&w=2080&auto=format&fit=crop",
      date: "12/06/2024"
    },
    {
      id: 3,
      title: "Cách huấn luyện chó đi vệ sinh đúng chỗ hiệu quả",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1924&auto=format&fit=crop",
      date: "10/06/2024"
    },
    {
      id: 4,
      title: "Top 5 loại đồ chơi an toàn và thú vị cho thú cưng",
      image: "https://images.unsplash.com/photo-1598875184988-5e67b1a874b8?q=80&w=1964&auto=format&fit=crop",
      date: "08/06/2024"
    }
  ]
};

// Dữ liệu comments mẫu
const comments = [
  {
    id: 1,
    author: "Nguyễn Văn A",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    content: "Bài viết rất hữu ích! Tôi đã áp dụng và thấy chú chó của mình thực sự hạnh phúc hơn.",
    date: "2 giờ trước",
    likes: 5
  },
  {
    id: 2,
    author: "Trần Thị B",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=2070&auto=format&fit=crop",
    content: "Cảm ơn tác giả đã chia sẻ những thông tin quý giá này. Tôi sẽ lưu lại để tham khảo.",
    date: "5 giờ trước",
    likes: 3
  }
];

const BlogDetail = () => {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(true);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = () => {
    if (comment.trim()) {
      // Xử lý gửi comment
      console.log("Comment:", comment);
      setComment("");
    }
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
              {blogDetail.title}
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="position-relative">
        <Image
          src={blogDetail.image}
          alt={blogDetail.title}
          style={{ 
            width: '100%', 
            height: '500px', 
            objectFit: 'cover' 
          }}
          preview={false}
        />
        <div 
          className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ 
            background: 'rgba(0,0,0,0.4)',
            top: 0,
            left: 0
          }}
        >
          <div className="text-center text-white">
            <Tag color="#e2a355" style={{ fontSize: '14px', padding: '4px 12px', marginBottom: '16px' }}>
              {blogDetail.category}
            </Tag>
            <h1 className="display-4 fw-bold mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              {blogDetail.title}
            </h1>
            <div className="d-flex align-items-center justify-content-center gap-4">
              <Space>
                <Avatar src={blogDetail.authorAvatar} size="small" />
                <span>{blogDetail.author}</span>
              </Space>
              <Space>
                <CalendarOutlined />
                <span>{blogDetail.date}</span>
              </Space>
              <Space>
                <BookOutlined />
                <span>{blogDetail.readTime}</span>
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
                {blogDetail.tags.map(tag => (
                  <Tag key={tag} color="gold" style={{ marginBottom: '8px' }}>
                    #{tag}
                  </Tag>
                ))}
              </div>

              {/* Content */}
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blogDetail.content }}
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
                  <Button 
                    type={liked ? "primary" : "default"}
                    icon={liked ? <HeartFilled /> : <HeartOutlined />}
                    onClick={handleLike}
                    style={{ color: liked ? '#fff' : '#e2a355', borderColor: '#e2a355' }}
                  >
                    {liked ? blogDetail.likes + 1 : blogDetail.likes} Thích
                  </Button>
                  <Button 
                    icon={<MessageOutlined />}
                    onClick={() => setShowComments(!showComments)}
                  >
                    {comments.length} Bình luận
                  </Button>
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
                  <span>{blogDetail.views} lượt xem</span>
                </Space>
              </div>
            </div>

            {/* Comments Section */}
            {showComments && (
              <div className="bg-white rounded shadow-sm p-5 mb-4">
                <h4 className="fw-bold mb-4">Bình luận ({comments.length})</h4>
                
                {/* Comment Form */}
                <div className="mb-4">
                  <div className="d-flex gap-3">
                    <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" />
                    <div className="flex-grow-1">
                      <TextArea
                        rows={3}
                        placeholder="Viết bình luận của bạn..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        style={{ marginBottom: '12px' }}
                      />
                      <Button 
                        type="primary" 
                        onClick={handleComment}
                        disabled={!comment.trim()}
                        style={{ background: '#e2a355', borderColor: '#e2a355' }}
                      >
                        Gửi bình luận
                      </Button>
                    </div>
                  </div>
                </div>

                <Divider />

                {/* Comments List */}
                <div className="comments-list">
                  {comments.map(comment => (
                    <div key={comment.id} className="d-flex gap-3 mb-4">
                      <Avatar src={comment.avatar} />
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <strong>{comment.author}</strong>
                            <span className="text-muted ms-2" style={{ fontSize: '14px' }}>
                              {comment.date}
                            </span>
                          </div>
                          <Button 
                            type="text" 
                            size="small" 
                            icon={<LikeOutlined />}
                            style={{ color: '#666' }}
                          >
                            {comment.likes}
                          </Button>
                        </div>
                        <p className="mb-0">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts */}
            <div className="bg-white rounded shadow-sm p-5">
              <h4 className="fw-bold mb-4">Bài viết liên quan</h4>
              <div className="row">
                {blogDetail.relatedPosts.map(post => (
                  <div key={post.id} className="col-md-6 mb-3">
                    <Link to={`/blog/${post.id}`} className="text-decoration-none">
                      <div className="card border-0 shadow-sm" style={{ transition: 'transform 0.2s' }}>
                        <Image
                          src={post.image}
                          alt={post.title}
                          style={{ height: '150px', objectFit: 'cover' }}
                          preview={false}
                        />
                        <div className="card-body">
                          <h6 className="card-title fw-bold text-dark">{post.title}</h6>
                          <small className="text-muted">{post.date}</small>
                        </div>
                      </div>
                    </Link>
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
                  <Avatar src={blogDetail.authorAvatar} size={64} />
                  <div>
                    <h6 className="fw-bold mb-1">{blogDetail.author}</h6>
                    <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
                      Bác sĩ thú y với 10 năm kinh nghiệm
                    </p>
                  </div>
                </div>
                <Button type="primary" block style={{ background: '#e2a355', borderColor: '#e2a355' }}>
                  Theo dõi
                </Button>
              </div>

              {/* Popular Posts */}
              <div className="bg-white rounded shadow-sm p-4 mb-4">
                <h5 className="fw-bold mb-3">Bài viết phổ biến</h5>
                {blogDetail.relatedPosts.slice(0, 3).map(post => (
                  <div key={post.id} className="d-flex gap-3 mb-3">
                    <Image
                      src={post.image}
                      alt={post.title}
                      style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                      preview={false}
                    />
                    <div>
                      <Link to={`/blog/${post.id}`} className="text-decoration-none">
                        <h6 className="fw-bold text-dark" style={{ fontSize: '14px', lineHeight: '1.4' }}>
                          {post.title}
                        </h6>
                      </Link>
                      <small className="text-muted">{post.date}</small>
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