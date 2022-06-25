import { Sequelize } from "sequelize-typescript/dist/sequelize/sequelize/sequelize";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("ProductRepository test", () => {  
  let sequelize: Sequelize;

  beforeEach( async ()  => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();    
  });

  afterEach(async () => {
    await sequelize.close();
  })

  it("should find all products", async () => {
    const productRepository = new ProductRepository();

    const product1 = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 100,
    }

    const product2 = {
      id: "2",
      name: "Product 2",
      description: "Product 2 description",
      salesPrice: 200,
    }

    await ProductModel.create(product1);
    await ProductModel.create(product2);

    const products = await productRepository.findAll();

    expect(products).toHaveLength(2);
    expect(products[0].id.id).toEqual(product1.id);
    expect(products[0].name).toEqual(product1.name);
    expect(products[0].description).toEqual(product1.description);
    expect(products[0].salesPrice).toEqual(product1.salesPrice);
    expect(products[1].id.id).toEqual(product2.id);
    expect(products[1].name).toEqual(product2.name);
    expect(products[1].description).toEqual(product2.description);
    expect(products[1].salesPrice).toEqual(product2.salesPrice);
  });

  it("should findById products", async () => {
    const productRepository = new ProductRepository();

    const product = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 100,
    }

    await ProductModel.create(product);

    const result = await productRepository.findById("1");

    expect(result.id.id).toEqual(product.id);
    expect(result.name).toEqual(product.name);
    expect(result.description).toEqual(product.description);
    expect(result.salesPrice).toEqual(product.salesPrice);
  });
});