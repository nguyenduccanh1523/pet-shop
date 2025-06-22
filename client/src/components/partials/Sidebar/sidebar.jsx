import React from "react";
import { HeartOutlined, ShoppingCartOutlined, DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Select, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/reset.css';
import './sidebar.css';
import { useSelector, useDispatch } from 'react-redux';
import { UserOutlined, LogoutOutlined, InfoCircleOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import * as actions from "../../../actions/actions"

const { Option } = Select;

const Sidebar = () => {
    const menuItems = [
        { key: '1', label: 'About Us', href: '/' },
        { key: '2', label: 'Ads', href: '/ads' },
        { key: '3', label: 'Brands', href: '/brand' },
        { key: '4', label: 'Stores', href: '/store' },
        { key: '5', label: 'Services', href: '/service' },
        { key: '6', label: 'Recruitments', href: '/recruitment' },
        { key: '7', label: 'Promotion', href: '/promotion' },
        { key: '8', label: 'FAQs', href: '/faq' },
    ];

    const pagesMenuItems = menuItems.map(item => ({
        key: item.key,
        label: <Link to={item.href} style={{textDecoration: 'none'}}>{item.label}</Link>
    }));

    const mainMenuItems = [
        {
            key: 'home',
            label: <Link to="/" style={{textDecoration: 'none'}}>Home</Link>,
        },
        {
            key: 'pages',
            label: (
                <Dropdown menu={{ items: pagesMenuItems }} trigger={["click"]} placement="bottomLeft">
                    <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                        Pages <DownOutlined />
                    </span>
                </Dropdown>
            ),
        },
        {
            key: 'shop',
            label: <Link to="/shop" style={{textDecoration: 'none'}}>Shop</Link>,
        },
        {
            key: 'blog',
            label: <Link to="/blog" style={{textDecoration: 'none'}}>Blog</Link>,
        },
        {
            key: 'contact',
            label: <Link to="/contact" style={{textDecoration: 'none'}}>Contact</Link>,
        },
        {
            key: 'others',
            label: <Link to="/support" style={{textDecoration: 'none'}}>Supports</Link>,
        }
    ];

    const { isLoggedIn, user } = useSelector((state) => state.root.auth || {});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(actions.logout());
        localStorage.removeItem('token');
        localStorage.removeItem('toastShown');
        navigate('/login');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const avatarUrl = user?.avatar_id.file_path || null;

    const profileItems = [
        {
            key: 'profile',
            icon: <InfoCircleOutlined />,
            label: 'Thông tin cá nhân',
            onClick: handleProfile,
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Đăng xuất',
            onClick: handleLogout,
        },
    ];

    return (
        <div className="sidebar-container">
            <div className="nav-wrapper">
                <Select
                    defaultValue="Shop by Category"
                    className="category-select"
                    styles={{ popup: { root: { minWidth: '200px' } } }}
                >
                    <Option value="clothes">Clothes</Option>
                    <Option value="food">Food</Option>
                    <Option value="toy">Toy</Option>
                </Select>
                <Menu mode="horizontal" className="main-menu" items={mainMenuItems} />
                <div className="user-actions">
                    {isLoggedIn ? (
                        <Dropdown menu={{ items: profileItems }} placement="bottomRight" trigger={["click"]}>
                            <span style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 8 }}>
                                <Avatar
                                    src={avatarUrl}
                                    icon={!avatarUrl && <UserOutlined />}
                                    size={36}
                                    style={{ background: '#eee', border: '1px solid #ccc' }}
                                />
                                <span style={{ fontWeight: 500 }}>{user?.username || 'Tài khoản'}</span>
                            </span>
                        </Dropdown>
                    ) : (
                        <Button type="primary" className="login-button" href="/login">
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <svg width="18" height="18" fill="currentColor" style={{ marginRight: 4 }} viewBox="0 0 24 24"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" /></svg>
                                Đăng nhập / Đăng ký
                            </span>
                        </Button>
                    )}
                    <Button type="text" icon={<HeartOutlined />} href="wishlist.html" />
                    <Button type="text" icon={<ShoppingCartOutlined />} href="#" className="cart-button">
                        <span className="badge">03</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;