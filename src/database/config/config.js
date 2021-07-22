require('dotenv').config();

module.exports.development = {
  url: process.env.DATABASE_URL_DEV,
  dialect: 'postgres',
  logging: false,
};

module.exports.testing = {
  url: process.env.DATABASE_URL_TEST,
  dialect: 'postgres',
  logging: false,
};

module.exports.production = {
  database: "ddgjm91pdljcur",
  username: "sqveaiwwweimed",
  password: "952278fa2a8c161e2a25c2f58864190c927a501eaa5afd2a080f04492bf89845",
  host: "ec2-108-128-104-50.eu-west-1.compute.amazonaws.com",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
};
