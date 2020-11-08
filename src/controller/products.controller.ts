import { APIGatewayEventRequestContext, APIGatewayProxyEventBase } from 'aws-lambda';
import { DatabaseService } from '../service/database.service';
import response from '../util/response';
import { Connection } from 'typeorm';
import { ProductEntity } from '../entity/product.entity';

export const getProducts = async (event: APIGatewayProxyEventBase<APIGatewayEventRequestContext>) => {
	try {
		const connection: Connection = await DatabaseService.getConnection();
		const products = connection.getRepository(ProductEntity).find();
		return response.success(products);
	} catch (error) {
		return response.error(error);
	}
};

export const getProductById = async (event: APIGatewayProxyEventBase<APIGatewayEventRequestContext>) => {
	try {
		console.log(event.pathParameters);
		const { productId } = event.pathParameters;
		console.log(productId);
		const connection: Connection = await DatabaseService.getConnection();
		const products = connection.getRepository(ProductEntity).findOne(productId);
		return response.success(products);
	} catch (error) {
		return response.error(error);
	}
};