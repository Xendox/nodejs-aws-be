import 'reflect-metadata';
import 'source-map-support/register';
import { injectable } from 'inversify';
import { ProductsController } from './controller/products.controller';
import { container, lazyInject } from './util/IoC';
import { DatabaseService } from './service/database.service';

@injectable()
export class Handler {
  @lazyInject(ProductsController)
  productsController: ProductsController;

  private readonly singletons = [
    DatabaseService,
    ProductsController,
    Handler,
  ];

  constructor() {
    for (const singleton of this.singletons) {
      console.log(JSON.stringify(singleton));
      container.bind<any>(singleton).to(singleton).inSingletonScope();
    }
    console.log('Init handler: ' + JSON.stringify(this.productsController));
    console.log(this.productsController);
  }

  public getLocalHandlers() {
    return {
      getProducts: this.productsController.getProducts,
      getProductById: this.productsController.getProductById,
      createProduct: this.productsController.createProduct,
    }
  }

  static get handlers() {
    const handler = new Handler();
    return handler.getLocalHandlers();
  }
}

export const handlers = Handler.handlers;
