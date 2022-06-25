import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    const result = await ProductModel.findAll();

    if (!result) {
      throw new Error(`Products not found`)
    }

    var products = result.map(product => new Product({
        id: new Id(product.get().id),
        name: product.get().name,
        description: product.get().description,
        salesPrice: product.get().salesPrice,
      })
    );

    return products;
  }

   async findById(id: string): Promise<Product> {
    throw new Error(`Method not implement`)
 }  
}