const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'aws-0-ap-southeast-1.pooler.supabase.com',
  port: 6543,
  username: 'postgres.ermujetutlrshamqlyzs',
  password: 'Tu)!Tr#H4ck',
  database: 'postgres',
  synchronize: true, // Đặt thành false nếu không muốn tự động đồng bộ hóa schema trong môi trường production
  logging: true,
  entities: [__dirname + '/entities/*.js'],
});
module.exports = { AppDataSource };
