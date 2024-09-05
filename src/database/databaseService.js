const { AppDataSource } = require('./data-source');

class DatabaseService {
  constructor() {
    this.dataSource = null;
  }

  async init() {
    if (!this.dataSource) {
      this.dataSource = await AppDataSource.initialize();
      console.log('Database connection initialized.');
    } else {
      console.log('Database connection already initialized.');
    }
    return this.dataSource;
  }

  getRepository(entity) {
    console.log('entity', entity);
    if (!this.dataSource) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.dataSource.getRepository(entity);
  }
}

module.exports = new DatabaseService();
