import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private dataSource: DataSource) { }
  async onModuleInit() {
    try {
      // is used to test the db connection
      if (this.dataSource.isInitialized) {

        console.log('Database connnection successful')
      }

    } catch (error) {
      console.log("database connection is failed:", error)
    }
  }

  getHello() {
    // this end point is for testing purpose
    return "Hello, World!";
  }
}
