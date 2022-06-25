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
        id: new Id(product.id),
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })
    );

    return products;
  }

   async findById(id: string): Promise<Product> {
    const product = await ProductModel.findOne({ where: { id: id }});

    if (!product) {
      throw new Error(`Product with id ${id} not found`)
    }

    const props = {
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    }

    return new Product(props);
  }  
}