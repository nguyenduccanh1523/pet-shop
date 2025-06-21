import React from "react";
import { HeartOutlined, ShoppingCartOutlined, DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Select, Button } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/reset.css';
import './sidebar.css';

const { Option } = Select;

const Sidebar = () => {
    const menuItems = [
        { key: '1', label: 'About Us', href: '/' },
        { key: '2', label: 'Shop', href: '/shop' },
        { key: '3', label: 'Single Product', href: '/' },
        { key: '4', label: 'Cart', href: '/' },
        { key: '5', label: 'Wishlist', href: '/' },
        { key: '6', label: 'Checkout', href: '/' },
        { key: '7', label: 'Blog', href: '/' },
        { key: '8', label: 'Single Post', href: '/' },
        { key: '9', label: 'Contact', href: '/' },
        { key: '10', label: 'FAQs', href: '/' },
    ];

    const pagesMenuItems = menuItems.map(item => ({
        key: item.key,
        label: <Link to={item.href}>{item.label}</Link>
    }));

    const mainMenuItems = [
        {
            key: 'home',
            label: <Link to="/">Home</Link>,
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
            label: <Link to="/shop">Shop</Link>,
        },
        {
            key: 'blog',
            label: <Link to="/">Blog</Link>,
        },
        {
            key: 'contact',
            label: <Link to="/">Contact</Link>,
        },
        {
            key: 'others',
            label: <Link to="/">Others</Link>,
        }
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
                    <Button type="primary" className="login-button" href="login.html">
                        <span style={{display: 'flex', alignItems: 'center', gap: 6}}>
                            <svg width="18" height="18" fill="currentColor" style={{marginRight: 4}} viewBox="0 0 24 24"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/></svg>
                            Đăng nhập / Đăng ký
                        </span>
                    </Button>
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