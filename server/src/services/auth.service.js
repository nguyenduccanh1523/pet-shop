import {
  User,
  Role,
  Media
} from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const ACCESS_TOKEN_EXPIRATION = '1h';        // Access token hết hạn sau 1 giờ
const REFRESH_TOKEN_EXPIRATION = '5d';       // Refresh token hết hạn sau 5 ngày
const REFRESH_TOKEN_EXPIRATION_MS = 5 * 24 * 60 * 60 * 1000; // 5 ngày tính bằng ms

// Tạo access token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.documentId, email: user.email, role_id: user.role_id },
    process.env.JWT_SECRET || 'your-default-secret',
    { expiresIn: ACCESS_TOKEN_EXPIRATION }
  );
};

// Tạo refresh token
const generateRefreshToken = () => {
  return jwt.sign(
    { data: uuidv4() },
    process.env.JWT_REFRESH_SECRET || 'refresh-secret',
    { expiresIn: REFRESH_TOKEN_EXPIRATION }
  );
};

// Kiểm tra độ mạnh của mật khẩu
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  return passwordRegex.test(password);
};

// Đăng ký người dùng mới
export const registerUser = async (userData) => {
  let { email, password, confirmPassword, username, role_id } = userData;

  // Nếu không có role_id thì lấy mặc định
  if (!role_id) {
    role_id = '6854d604ab337558a82810ed';
  }
  // Nếu không có username thì lấy username = email
  if (!username) {
    username = email;
  }

  if (!email || !password || !confirmPassword || !username || !role_id) {
    return { success: false, statusCode: 400, message: 'Thiếu thông tin bắt buộc' };
  }
  if (password !== confirmPassword) {
    return { success: false, statusCode: 400, message: 'Mật khẩu xác nhận không khớp' };
  }
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return { success: false, statusCode: 400, message: 'Email đã tồn tại' };
  }
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return { success: false, statusCode: 400, message: 'Username đã tồn tại' };
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  // Nếu không có avatar_id thì lấy mặc định
  let avatar_id = userData.avatar_id || '6854de4cb6cc2b417b2bdedd';
  const user = await User.create({
    documentId: uuidv4(),
    username,
    email,
    password: hashedPassword,
    role_id,
    avatar_id
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken();
  const refreshExpires = new Date(Date.now() + REFRESH_TOKEN_EXPIRATION_MS);

  user.refresh_token = refreshToken;
  user.refresh_token_expires = refreshExpires;
  await user.save();

  return {
    success: true,
    statusCode: 201,
    message: 'Đăng ký thành công',
    data: {
      jwt: accessToken,
      user: {
        id: user.documentId,
        documentId: user.documentId,
        username: user.username,
        email: user.email,
        role: user.role_id,
        provider: 'local',
        confirmed: user.email_verified,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        avatar_id: user.avatar_id
      },
      refresh_token: refreshToken
    }
  };
};

// Đăng nhập
export const loginUser = async (credentials) => {
  const { identifier, password } = credentials;
  if (!identifier || !password) {
    return { success: false, statusCode: 400, message: 'Thiếu thông tin đăng nhập' };
  }
  // Tìm user và populate role, avatarMedia
  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }]
  })
    .populate({ path: 'role_id', model: 'Role' })
    .populate({ path: 'avatar_id', model: 'Media' });

  if (!user) {
    return { success: false, statusCode: 404, message: 'Sai email/username hoặc mật khẩu' };
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return { success: false, statusCode: 401, message: 'Sai email/username hoặc mật khẩu' };
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken();
  const refreshExpires = new Date(Date.now() + REFRESH_TOKEN_EXPIRATION_MS);

  user.refresh_token = refreshToken;
  user.refresh_token_expires = refreshExpires;
  await user.save();

  return {
    success: true,
    statusCode: 200,
    message: 'Đăng nhập thành công',
    data: {
      jwt: accessToken,
      user: {
        id: user.documentId,
        documentId: user.documentId,
        username: user.username,
        email: user.email,
        role: user.role_id, // đã populate
        provider: 'local',
        confirmed: user.email_verified,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        avatar_id: user.avatar_id,
      },
      refresh_token: refreshToken
    }
  };
};

// Làm mới token
export const refreshUserToken = async (refreshTokenData) => {
  const { refreshToken } = refreshTokenData;

  if (!refreshToken) {
    return {
      success: false,
      statusCode: 400,
      message: 'Refresh token không được cung cấp',
      error: 'Missing refresh token'
    };
  }

  try {
    // Tìm user với refresh token này (chuẩn Mongoose)
    const user = await User.findOne({ refresh_token: refreshToken });

    if (!user) {
      return {
        success: false,
        statusCode: 401,
        message: 'Refresh token không hợp lệ',
        error: 'Invalid refresh token'
      };
    }

    // Kiểm tra xem refresh token đã hết hạn chưa
    if (new Date() > new Date(user.refresh_token_expires)) {
      // Xóa refresh token từ database
      user.refresh_token = null;
      user.refresh_token_expires = null;
      await user.save();
      return {
        success: false,
        statusCode: 401,
        message: 'Refresh token đã hết hạn',
        error: 'Expired refresh token'
      };
    }

    // Tạo access token mới
    const newAccessToken = generateAccessToken(user);

    // Tạo refresh token mới (luân chuyển)
    const newRefreshToken = generateRefreshToken();
    const refreshExpires = new Date(Date.now() + REFRESH_TOKEN_EXPIRATION_MS);

    // Cập nhật refresh token mới vào database
    user.refresh_token = newRefreshToken;
    user.refresh_token_expires = refreshExpires;
    await user.save();

    return {
      success: true,
      statusCode: 200,
      message: 'Làm mới token thành công',
      data: {
        jwt: newAccessToken,
        refresh_token: newRefreshToken
      }
    };
  } catch (error) {
    console.error('Lỗi refresh token:', error);
    return {
      success: false,
      statusCode: 500,
      message: 'Lỗi server',
      error: error.message
    };
  }
};

// Đăng xuất
export const logoutUser = async (userId) => {
  if (!userId) {
    return {
      success: false,
      statusCode: 401,
      message: 'Không xác thực được người dùng',
      error: 'Unauthorized'
    };
  }

  try {
    // Tìm user
    const user = await User.findOne({ documentId: userId });

    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: 'Không tìm thấy người dùng',
        error: 'User not found'
      };
    }

    // Xóa refresh token và cập nhật trạng thái
    user.refresh_token = null;
    user.refresh_token_expires = null;
    await user.save();

    return {
      success: true,
      statusCode: 200,
      message: 'Đăng xuất thành công'
    };
  } catch (error) {
    console.error('Lỗi đăng xuất:', error);
    return {
      success: false,
      statusCode: 500,
      message: 'Lỗi server',
      error: error.message
    };
  }
}; 