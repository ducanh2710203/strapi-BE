"use strict";

/**
 * Simple login controller
 */

module.exports = {
  async login(ctx) {
    const { email, pass } = ctx.request.body;

    // Kiểm tra xem email và pass có được cung cấp hay không
    if (!email || !pass) {
      return ctx.badRequest("Email và mật khẩu là bắt buộc!");
    }

    try {
      // Tìm người dùng trong bảng user_roles theo email
      const user = await strapi.query("user-role").findOne({ email });

      // Nếu không tìm thấy người dùng
      if (!user) {
        return ctx.badRequest("Người dùng không tồn tại!");
      }

      // So sánh mật khẩu từ body và mật khẩu từ database
      if (pass !== user.pass) {
        return ctx.badRequest("Mật khẩu không chính xác!");
      }

      // Nếu thông tin đúng, cho phép tiếp tục (ở đây bạn có thể trả về dữ liệu cần thiết)
      return ctx.send({
        message: "Đăng nhập thành công!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      // Xử lý lỗi
      return ctx.internalServerError(
        "Có lỗi xảy ra trong quá trình đăng nhập!"
      );
    }
  },
  async register(ctx) {
    const { name, email, pass } = ctx.request.body;

    // Kiểm tra xem các trường cần thiết đã được cung cấp hay chưa
    if (!name || !email || !pass) {
      return ctx.badRequest("Tên, email và mật khẩu là bắt buộc!");
    }

    try {
      // Kiểm tra xem email đã tồn tại hay chưa
      const existingUser = await strapi.query("user-role").findOne({ email });

      if (existingUser) {
        return ctx.badRequest("Email đã tồn tại!");
      }

      // Nếu email chưa tồn tại, tạo người dùng mới
      const newUser = await strapi.query("user-role").create({
        name,
        email,
        pass, // Mật khẩu không mã hóa (plaintext)
      });

      // Trả về thông tin người dùng vừa tạo
      return ctx.send({
        message: "Đăng ký thành công!",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error) {
      // Xử lý lỗi
      return ctx.internalServerError("Có lỗi xảy ra trong quá trình đăng ký!");
    }
  },
};
