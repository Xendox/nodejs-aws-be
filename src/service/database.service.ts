import { defaults } from 'pg';
import { ProductEntity } from '../entity/product.entity';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

export class DatabaseService {
	private static connection: Connection;
	private static connectionOptions: ConnectionOptions = {
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
		console.log(defaults);
	}

	public static async getConnection(): Promise<Connection> {
		return this.connection || (this.connection = await createConnection(this.connectionOptions));
	}
}