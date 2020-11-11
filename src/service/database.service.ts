import { injectable } from 'inversify';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { ProductEntity } from '../entity/product.entity';

@injectable()
export class DatabaseService {
	private connection: Connection;
	private readonly connectionOptions: ConnectionOptions = {
		type: 'postgres',
		host: process.env.DATABASE_HOST,
		port: +process.env.DATABASE_PORT,
		username: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		synchronize: true,
		logging: true,
		entities: [
			ProductEntity,
		],
		migrations: [
			'**/*.migration{.ts,.js}'
		],
		subscribers: [
			'**/*.subscriber{.ts,.js}'
		]
	};

	constructor() {
		createConnection(this.connectionOptions).then(connection => this.connection = connection);
		console.log('Init database service');
	}
}