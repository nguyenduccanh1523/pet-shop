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
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import * as actions from "../../actions/actions";// Đổi lại đúng path actions của bạn

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({ identifier: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, msg, loading, user } = useSelector(
    (state) => state.root.auth || {}
  );

  useEffect(() => {
    if (isLoggedIn && user) {
      const token = localStorage.getItem("token");
      const isNewLogin = sessionStorage.getItem("isNewLogin");
      if (token && isNewLogin === "true") {
        if (user.role?.role_name === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
        sessionStorage.removeItem("isNewLogin");
        dispatch(actions.clearMessage());
      }
    }
  }, [isLoggedIn, user, navigate, dispatch]);

  useEffect(() => {
    if (msg && !isLoggedIn) {
      const icon = msg === "Login successful" ? "success" : "error";
      const title = msg === "Login successful" ? "Success!" : "Error";
      Swal.fire({
        title: title,
        text: msg,
        icon: icon,
        confirmButtonText: "OK",
      }).then(() => {
        dispatch(actions.clearMessage());
      });
    }
  }, [msg, isLoggedIn, dispatch]);

  useEffect(() => {
    if (isLoggedIn && user && user.jwt) {
      localStorage.setItem("token", user.jwt);
      sessionStorage.setItem("isNewLogin", "true");
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    // Nếu đã có token thì chuyển hướng về trang chủ
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const validateEmail = (email) => /.+@.+\..+/.test(email);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { identifier: "", password: "" };
    if (!formData.identifier) {
      newErrors.identifier = "Email hoặc username là bắt buộc";
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
      valid = false;
    }
    setErrors(newErrors);
    if (valid) {
      const payload = {
        identifier: formData.identifier,
        password: formData.password,
      };
      dispatch(actions.login(payload));
    }
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <MDBCard style={{ maxWidth: 900, width: '100%', borderRadius: 18, boxShadow: '0 4px 32px rgba(0,0,0,0.08)' }}>
        <MDBRow className='g-0'>
          {/* Ảnh bên trái */}
          <MDBCol md='6' className='d-flex align-items-center justify-content-center' style={{ background: '#fdf6ee', borderRadius: '18px 0 0 18px' }}>
            <div className="text-center w-100">
              <img src={banner1} alt="login form" style={{ maxWidth: 340, width: '100%', borderRadius: 16 }} />
            </div>
          </MDBCol>

          {/* Form bên phải */}
          <MDBCol md='6' className='d-flex align-items-center justify-content-center'>
            <MDBCardBody className='w-100' style={{ maxWidth: 370, margin: 'auto' }}>
              <div className='text-center mb-4'>
                <img src={logo} alt="logo" style={{ maxWidth: 180, width: '100%', marginBottom: 8 }} />
              </div>
              <h5 className="fw-bold mb-4" style={{ letterSpacing: '1px', color: '#222' }}>Đăng nhập tài khoản</h5>
              <form onSubmit={handleSubmit} autoComplete="off">
                <Input
                  className="mb-3"
                  placeholder="Email hoặc username"
                  type="text"
                  size="large"
                  style={{ borderRadius: 8 }}
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  autoFocus
                  status={errors.identifier ? "error" : ""}
                />
                {errors.identifier && (
                  <div style={{ color: "red", fontSize: 13, marginBottom: 8 }}>{errors.identifier}</div>
                )}
                <Input.Password
                  className="mb-3"
                  placeholder="Mật khẩu"
                  size="large"
                  style={{ borderRadius: 8 }}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  status={errors.password ? "error" : ""}
                />
                {errors.password && (
                  <div style={{ color: "red", fontSize: 13, marginBottom: 8 }}>{errors.password}</div>
                )}
                <MDBBtn
                  className="mb-3 w-100 py-2"
                  color='dark'
                  size='lg'
                  style={{ borderRadius: 8, fontWeight: 600, fontSize: 18, height: 48, minHeight: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <Spin size="small" style={{ color: 'white' }} /> : "Đăng nhập"}
                </MDBBtn>
              </form>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <a className="small text-muted" href="#" style={{ textDecoration: 'underline' }}>Quên mật khẩu?</a>
                <a className="small text-muted" href="/register" style={{ textDecoration: 'underline' }}>Đăng ký ngay</a>
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

export default Login;