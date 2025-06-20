import React from "react";
import { Link } from "react-router-dom";

// Dữ liệu mẫu cho danh sách store
const stores = [
  { id: 1, name: "NGUYENTHONG_COMPUTER", logo: "https://i.imgur.com/J3t52pM.png", products: 135 },
  { id: 2, name: "PHUKIENCHUYENDOI", logo: "https://i.imgur.com/J3t52pM.png", products: 250 },
  { id: 3, name: "PETSHOP_VIETNAM", logo: "https://cdn-icons-png.flaticon.com/512/616/616408.png", products: 88 },
];

const StoreCard = ({ store }) => (
    <div className="col-md-4 mb-4">
        <div className="card h-100 text-center p-3">
            <img src={store.logo} alt={store.name} className="rounded-circle mx-auto" style={{width: 80, height: 80, objectFit: 'cover'}}/>
            <div className="card-body">
                <h5 className="card-title">{store.name}</h5>
                <p className="card-text">Sản phẩm: {store.products}</p>
                <Link to={`/store/${store.id}`} className="btn" style={{backgroundColor: '#ee4d2d', color: 'white'}}>
                    Xem Shop
                </Link>
            </div>
        </div>
    </div>
);

const StoreList = () => {
    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Danh sách cửa hàng</h2>
            
            {/* Search Bar */}
            <div className="row justify-content-center mb-5">
                <div className="col-md-6">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Tìm kiếm cửa hàng..." />
                        <button className="btn btn-outline-secondary" type="button" style={{borderColor: '#ee4d2d', color: '#ee4d2d'}}>Tìm kiếm</button>
                    </div>
                </div>
            </div>

            {/* Store List */}
            <div className="row">
                {stores.map(store => (
                    <StoreCard key={store.id} store={store} />
                ))}
            </div>
        </div>
    )
}

export default StoreList;