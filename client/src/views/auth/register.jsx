import React from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import banner1 from "../../assets/images/banner-img.png";
import logo from "../../assets/images/logo.png";

const Register = () => {
  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
              <h5 className="fw-bold mb-4" style={{ letterSpacing: '1px', color: '#222' }}>Create your account</h5>
              <MDBInput wrapperClass='mb-3' label='Họ tên' id='formName' type='text' size="lg" style={{ borderRadius: 8 }} />
              <MDBInput wrapperClass='mb-3' label='Email address' id='formEmail' type='email' size="lg" style={{ borderRadius: 8 }} />
              <MDBInput wrapperClass='mb-3' label='Password' id='formPassword' type='password' size="lg" style={{ borderRadius: 8 }} />
              <MDBInput wrapperClass='mb-3' label='Xác nhận mật khẩu' id='formConfirmPassword' type='password' size="lg" style={{ borderRadius: 8 }} />
              <MDBBtn className="mb-3 w-100 py-2" color='dark' size='lg' style={{ borderRadius: 8, fontWeight: 600, fontSize: 18 }}>Đăng ký</MDBBtn>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <a className="small text-muted" href="#" style={{ textDecoration: 'underline' }}>Đã có tài khoản? Đăng nhập</a>
              </div>
              <div className='d-flex flex-row justify-content-center mt-4'>
                <a href="#" className="small text-muted me-2" style={{ textDecoration: 'underline' }}>Terms of use</a>
                <span className="mx-1">·</span>
                <a href="#" className="small text-muted" style={{ textDecoration: 'underline' }}>Privacy policy</a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </div>
  );
}

export default Register;
