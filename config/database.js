// config/database.js

module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        uri: env("DATABASE_URI", "mongodb://localhost:27017/demotttn"), // Sử dụng 'DATABASE_URI' trong tệp .env
      },
      options: {
        ssl: false,
      },
    },
  },
});
