module.exports = () => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        uri: "mongodb+srv://duc2710203:ducanh2710@cluster0.lyvby.mongodb.net/tttn?retryWrites=true&w=majority&appName=Cluster0",
      },
      options: {
        ssl: true, // Sử dụng true cho MongoDB Atlas (SSL kết nối an toàn)
      },
    },
  },
});
