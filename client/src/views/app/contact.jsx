import React, { useState } from "react";

// Dữ liệu mẫu cho hội thoại
const conversations = [
  {
    id: 1,
    name: "youth_official",
    lastMsg: "Đơn hàng của Đức ...",
    date: "18/05/22",
    unread: 4,
  },
  {
    id: 2,
    name: "nguyenthong_pc",
    lastMsg: "Xin chào, shop có hỗ trợ đổi trả không?",
    date: "Hôm nay",
    unread: 0,
  },
];

// Dữ liệu mẫu cho tin nhắn
const messages = [
  {
    type: "system",
    content: "LƯU Ý: PetShop KHÔNG cho phép các hành vi: Đặt cọc/Chuyển khoản riêng cho người bán/Giao dịch ngoài hệ thống/Cung cấp thông tin liên hệ cho người bán/Các hoạt động tuyển CTV/Tặng quà miễn phí, ... Vui lòng chỉ mua-bán trực tiếp trên website để tránh nguy cơ bị lừa đảo bạn nhé!",
    link: "#",
  },
];

const Contact = () => {
  const [selectedConv, setSelectedConv] = useState(conversations[1]);
  const [input, setInput] = useState("");

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div className="container py-4">
        <div className="d-flex border rounded shadow-sm" style={{ minHeight: 500, background: "#fff" }}>
          {/* Sidebar hội thoại */}
          <div style={{ width: 270, borderRight: "1px solid #eee", background: "#fafbfc" }}>
            <div className="p-3 border-bottom" style={{ color: "#ee4d2d", fontWeight: 700, fontSize: 20 }}>
              Chat <span style={{ color: "#ee4d2d", fontWeight: 400 }}>(1)</span>
            </div>
            <div className="p-2">
              <input className="form-control" placeholder="Tìm theo tên" style={{ borderRadius: 8, fontSize: 15 }} />
            </div>
            <div className="d-flex align-items-center justify-content-between px-3 py-2" style={{ fontSize: 15 }}>
              <span className="fw-bold">Tất cả</span>
              <span style={{ color: "#888" }}>▼</span>
            </div>
            <div>
              {conversations.map(conv => (
                <div
                  key={conv.id}
                  className="d-flex align-items-center px-3 py-2"
                  style={{
                    background: selectedConv.id === conv.id ? "#fff7ea" : "transparent",
                    cursor: "pointer",
                    borderLeft: selectedConv.id === conv.id ? "3px solid #ee4d2d" : "3px solid transparent",
                    borderRadius: 6,
                    marginBottom: 2,
                  }}
                  onClick={() => setSelectedConv(conv)}
                >
                  <div className="flex-grow-1">
                    <div className="fw-bold" style={{ fontSize: 15 }}>{conv.name}</div>
                    <div className="text-muted" style={{ fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 150 }}>
                      {conv.lastMsg}
                    </div>
                  </div>
                  <div className="text-end ms-2" style={{ minWidth: 40 }}>
                    <div style={{ fontSize: 12, color: "#888" }}>{conv.date}</div>
                    {conv.unread > 0 && (
                      <span className="badge bg-danger" style={{ fontSize: 12 }}>{conv.unread}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Khung chat chính */}
          <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
            {/* Header chat */}
            <div className="d-flex align-items-center border-bottom px-4 py-2" style={{ minHeight: 56 }}>
              <span className="fw-bold" style={{ fontSize: 16 }}>{selectedConv.name}</span>
              <span className="ms-2" style={{ color: "#888" }}>▼</span>
            </div>
            {/* Nội dung chat */}
            <div className="flex-grow-1 p-4" style={{ overflowY: "auto", background: "#f9f9f9" }}>
              <div className="text-center mb-3">
                <span className="badge bg-light text-dark" style={{ fontSize: 13, border: "1px solid #eee" }}>Ngày hôm nay</span>
              </div>
              {messages.map((msg, idx) =>
                msg.type === "system" ? (
                  <div key={idx} className="alert alert-warning py-2 px-3" style={{ fontSize: 14, maxWidth: 500, margin: "auto" }}>
                    <b>⚠️ LƯU Ý:</b> {msg.content} {" "}
                    <a href={msg.link} style={{ color: "#007bff" }}>Tìm hiểu thêm</a>
                  </div>
                ) : (
                  <div key={idx}>{msg.content}</div>
                )
              )}
            </div>
            {/* Khung nhập tin nhắn */}
            <div className="border-top px-3 py-2" style={{ background: "#fff" }}>
              <div className="d-flex align-items-center">
                <input
                  className="form-control me-2"
                  placeholder="Nhập nội dung tin nhắn"
                  style={{ borderRadius: 8, fontSize: 15 }}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                <button className="btn btn-light me-1" title="Gửi hình ảnh">
                  <i className="bi bi-image" style={{ fontSize: 18 }}></i>
                </button>
                <button className="btn btn-light me-1" title="Gửi file">
                  <i className="bi bi-paperclip" style={{ fontSize: 18 }}></i>
                </button>
                <button className="btn" style={{ background: "#ee4d2d", color: "#fff", fontWeight: 600 }}>
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;