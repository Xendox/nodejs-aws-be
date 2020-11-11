import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ProductEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	name: string;

	@Column()
	description: string;

	@Column()
	price: number;

	@Column()
	count: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;


	constructor(name: string, description: string, price: number, count: number) {
		this.name = name;
		this.description = description;
		this.price = price;
		this.count = count;
	}
}