import { injectable } from 'inversify';
import { getConnection } from 'typeorm';
import { APIGatewayEventRequestContext, APIGatewayProxyEventBase } from 'aws-lambda';
import { lazyInject } from '../util/IoC';
import { DatabaseService } from '../service/database.service';
import response from '../util/response';
import { ProductEntity } from '../entity/product.entity';
import { InProductDTO } from '../dto/in.product.dto';
import { InProductSchema } from '../schema/in.product.schema';

@injectable()
export class ProductsController {
	@lazyInject(DatabaseService)
	databaseService: DatabaseService;

	constructor() {
		console.log('Init products controller');
	}

	public async getProducts(event: APIGatewayProxyEventBase<APIGatewayEventRequestContext>) {
		try {
			const products = getConnection().getRepository(ProductEntity).find();
			return response.success(products);
		} catch (error) {
			return response.error(error);
		}
	}

	public async getProductById(event: APIGatewayProxyEventBase<APIGatewayEventRequestContext>) {
		try {
			const { productId } = event.pathParameters;
			const products = getConnection().getRepository(ProductEntity).findOne(productId);
			return response.success(products);
		} catch (error) {
			return response.error(error);
		}
	}

	public async createProduct(event: APIGatewayProxyEventBase<APIGatewayEventRequestContext>) {
		try {
			const inProductDto: InProductDTO = JSON.parse(event.body);
			await InProductSchema.validateAsync(inProductDto);

			await getConnection().transaction(async transactionalEntityManager => {
				const { title, description, price, count } = inProductDto;
				const product = new ProductEntity(title, description, price, count);
				await transactionalEntityManager.save(product);
			});

			return response.success(true);
		} catch (error) {
			return response.error(error);
		}
	}
}