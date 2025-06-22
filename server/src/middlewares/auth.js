import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Role from '../models/role.js';

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Không có token xác thực',
        error: { message: 'Không có token xác thực' }
      });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET || 'your-default-secret', async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token không hợp lệ hoặc đã hết hạn',
          error: { message: err.message }
        });
      }

      const user = await User.findOne({ documentId: decoded.id });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy người dùng',
          error: { message: 'Không tìm thấy người dùng' }
        });
      }

      req.userId = decoded.id;
      req.userEmail = decoded.email;
      req.userRole = user.role_id;

      next();
    });
  } catch (error) {
    console.error('Lỗi xác thực:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: { message: error.message }
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const { userRole } = req;

    const adminRole = await Role.findOne({ role_name: 'admin' });
    if (!adminRole) {
      return res.status(500).json({
        success: false,
        message: 'Không tìm thấy role admin trong hệ thống',
        error: { message: 'Role admin không tồn tại' }
      });
    }

    if (String(userRole) !== String(adminRole._id)) {
      return res.status(403).json({
        success: false,
        message: 'Không có quyền truy cập',
        error: { message: 'Không có quyền truy cập' }
      });
    }

    next();
  } catch (error) {
    console.error('Lỗi kiểm tra quyền admin:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: { message: error.message }
    });
  }
}; 