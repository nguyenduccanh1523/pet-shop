import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Input, Alert, Spin } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import banner1 from "../../assets/images/banner-img.png";
import logo from "../../assets/images/logo.png";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Nếu đã có token thì chuyển hướng về trang chủ
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const validateEmail = (email) => {
    return /.+@.+\..+/.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    if (!validateEmail(email)) {
      setError('Email không hợp lệ!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }
    setError('');
    setLoading(true);
    // Giả lập gọi API đăng ký
    setTimeout(() => {
      setLoading(false);
      // Nếu thành công:
      // setEmail(''); setPassword(''); setConfirmPassword('');
      // Nếu thất bại: setError('Đăng ký thất bại!');
    }, 1500);
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <MDBCard style={{ maxWidth: 900, width: '100%', borderRadius: 18, boxShadow: '0 4px 32px rgba(0,0,0,0.08)' }}>
        <MDBRow className='g-0'>
          {/* Ảnh bên trái */}
          <MDBCol md='6' className='d-flex align-items-center justify-content-center' style={{ background: '#fdf6ee', borderRadius: '18px 0 0 18px' }}>
            <div className="text-center w-100">
              <img src={banner1} alt="register form" style={{ maxWidth: 340, width: '100%', borderRadius: 16 }} />
            </div>
          </MDBCol>

          {/* Form bên phải */}
          <MDBCol md='6' className='d-flex align-items-center justify-content-center'>
            <MDBCardBody className='w-100' style={{ maxWidth: 370, margin: 'auto' }}>
              <div className='text-center mb-4'>
                <img src={logo} alt="logo" style={{ maxWidth: 180, width: '100%', marginBottom: 8 }} />
              </div>
              <h5 className="fw-bold mb-4" style={{ letterSpacing: '1px', color: '#222' }}>Tạo tài khoản mới</h5>
              {error && <Alert message={error} type="error" showIcon className="mb-3" style={{ fontSize: 15 }} />}
              <form onSubmit={handleRegister} autoComplete="off">
                <Input
                  className="mb-3"
                  placeholder="Email address"
                  type="text"
                  size="large"
                  style={{ borderRadius: 8 }}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoFocus
                />
                <Input.Password
                  className="mb-3"
                  placeholder="Password"
                  size="large"
                  style={{ borderRadius: 8 }}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                <Input.Password
                  className="mb-3"
                  placeholder="Xác nhận mật khẩu"
                  size="large"
                  style={{ borderRadius: 8 }}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                <MDBBtn
                  className="mb-3 w-100 py-2"
                  color='dark'
                  size='lg'
                  style={{ borderRadius: 8, fontWeight: 600, fontSize: 18, height: 48, minHeight: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  type="submit"
                  disabled={loading || !email || !password || !confirmPassword || password !== confirmPassword}
                >
                  {loading ? <Spin size="small" style={{ color: 'white' }} /> : "Đăng ký"}
                </MDBBtn>
              </form>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <a className="small text-muted" href="/login" style={{ textDecoration: 'underline' }}>Đã có tài khoản? Đăng nhập</a>
              </div>
              <div className='d-flex flex-row justify-content-center mt-4'>
                <a href="#" className="small text-muted me-2" style={{ textDecoration: 'underline' }}>Điều khoản</a>
                <span className="mx-1">·</span>
                <a href="#" className="small text-muted" style={{ textDecoration: 'underline' }}>Chính sách</a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </div>
  );
}

export default Register;
