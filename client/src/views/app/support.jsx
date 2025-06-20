import React, { useState } from "react";

// Dữ liệu mẫu cho FAQ
const faqs = [
  {
    question: "Làm sao để đặt hàng trên website?",
    answer: "Bạn chỉ cần chọn sản phẩm, thêm vào giỏ hàng và làm theo hướng dẫn thanh toán. Nếu cần hỗ trợ, hãy liên hệ hotline hoặc chat với shop."
  },
  {
    question: "Tôi muốn đổi/trả hàng thì làm thế nào?",
    answer: "Bạn có thể đổi/trả hàng trong vòng 5 ngày kể từ khi nhận hàng. Vui lòng liên hệ bộ phận CSKH để được hướng dẫn chi tiết."
  },
  {
    question: "Có những phương thức thanh toán nào?",
    answer: "Chúng tôi hỗ trợ chuyển khoản, thanh toán khi nhận hàng (COD) và các ví điện tử phổ biến."
  },
  {
    question: "Thời gian giao hàng dự kiến là bao lâu?",
    answer: "Nội thành Hà Nội/HCM: 1-2 ngày. Các tỉnh thành khác: 2-5 ngày làm việc."
  }
];

// Component FAQ Accordion
const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="accordion" id="faqAccordion">
      {faqs.map((faq, idx) => (
        <div className="accordion-item mb-2" key={idx} style={{ borderRadius: 8, border: 'none', boxShadow: '0 1px 4px #eee' }}>
          <h2 className="accordion-header" id={`heading${idx}`}>
            <button
              className={`accordion-button ${openIndex === idx ? "" : "collapsed"}`}
              type="button"
              style={{ borderRadius: 8, background: '#fff7ea', fontWeight: 600, color: '#e2a355' }}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              {faq.question}
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse${openIndex === idx ? " show" : ""}`}
          >
            <div className="accordion-body" style={{ background: '#fff', color: '#444' }}>
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Component form liên hệ
const SupportForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <form className="p-4 rounded shadow-sm bg-white" style={{ maxWidth: 500, margin: "auto" }} onSubmit={handleSubmit}>
      <h5 className="fw-bold mb-3" style={{ color: "#e2a355" }}>Gửi yêu cầu hỗ trợ</h5>
      <div className="mb-3">
        <input type="text" className="form-control" name="name" placeholder="Họ và tên" value={form.name} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <input type="email" className="form-control" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <textarea className="form-control" name="message" rows={4} placeholder="Nội dung cần hỗ trợ..." value={form.message} onChange={handleChange} required />
      </div>
      <button className="btn w-100" style={{ background: "#e2a355", color: "white", fontWeight: 600 }}>Gửi yêu cầu</button>
      {sent && <div className="alert alert-success mt-3">Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ bạn sớm nhất.</div>}
    </form>
  );
};

const Support = () => {
  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      {/* Banner */}
      <div className="text-center py-5" style={{ background: "linear-gradient(90deg, #fff7ea 0%, #fff0d6 100%)" }}>
        <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="support" style={{ width: 80, marginBottom: 16 }} />
        <h1 className="fw-bold" style={{ color: "#e2a355" }}>Hỗ trợ khách hàng</h1>
        <p className="lead text-muted">Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn!</p>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Cột trái: FAQ và liên hệ */}
          <div className="col-lg-7">
            {/* Tìm kiếm nhanh */}
            <div className="mb-4">
              <input type="text" className="form-control form-control-lg" placeholder="Tìm kiếm câu hỏi, vấn đề bạn gặp phải..." style={{ borderRadius: 8, boxShadow: '0 1px 4px #eee' }} />
            </div>
            {/* FAQ */}
            <FAQAccordion />

            {/* Các kênh liên hệ */}
            <div className="mt-5">
              <h5 className="fw-bold mb-3" style={{ color: "#e2a355" }}>Các kênh hỗ trợ khác</h5>
              <div className="d-flex flex-wrap gap-3">
                <a href="tel:0949111520" className="btn btn-light border d-flex align-items-center" style={{ borderRadius: 8 }}>
                  <span style={{ fontSize: 22, color: "#e2a355" }}>📞</span>
                  <span className="ms-2">Hotline: 0949111520</span>
                </a>
                <a href="mailto:support@petshop.com" className="btn btn-light border d-flex align-items-center" style={{ borderRadius: 8 }}>
                  <span style={{ fontSize: 22, color: "#e2a355" }}>✉️</span>
                  <span className="ms-2">Email: support@petshop.com</span>
                </a>
                <a href="https://zalo.me/0949111520" className="btn btn-light border d-flex align-items-center" style={{ borderRadius: 8 }}>
                  <span style={{ fontSize: 22, color: "#e2a355" }}>💬</span>
                  <span className="ms-2">Chat Zalo</span>
                </a>
                <a href="https://facebook.com/petshop" className="btn btn-light border d-flex align-items-center" style={{ borderRadius: 8 }}>
                  <span style={{ fontSize: 22, color: "#e2a355" }}>📱</span>
                  <span className="ms-2">Fanpage Facebook</span>
                </a>
              </div>
            </div>
          </div>
          {/* Cột phải: Form gửi yêu cầu */}
          <div className="col-lg-5">
            <SupportForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;