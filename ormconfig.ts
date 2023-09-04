// ormconfig.js
console.log("process.env.DB_HOST", process.env.DB_HOST)
module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nestjsapp',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // Only for development, set to false in production
};

