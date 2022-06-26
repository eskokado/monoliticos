import { Sequelize } from "sequelize-typescript";
import StoreCatalogFacadeFactory from "../factory/facade.factory";
import ProductModel from "../repository/product.model";

describe("StoreCatalogFacade test", () => {
  
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

  it("should find a product", async () => {
    const product = {
      id: "1",
      name: "Product 1",
      description: "Description Product 1",
      salesPrice: 100
    };

    const facade = StoreCatalogFacadeFactory.create();
    await ProductModel.create(product);

    const result = await facade.findById({id: "1"});

    expect(result.id).toEqual(product.id);
    expect(result.name).toEqual(product.name);
    expect(result.description).toEqual(product.description);
    expect(result.salesPrice).toEqual(product.salesPrice);
  });

  it("should find all an products", async () => {
    const product1 = {
      id: "1",
      name: "Product 1",
      description: "Description Product 1",
      salesPrice: 100
    };
    const product2 = {
      id: "2",
      name: "Product 2",
      description: "Description Product 2",
      salesPrice: 200
    };

    const facade = StoreCatalogFacadeFactory.create();
    await ProductModel.create(product1);
    await ProductModel.create(product2);

    const result = await facade.findAll();

    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toEqual(product1.id);
    expect(result.products[0].name).toEqual(product1.name);
    expect(result.products[0].description).toEqual(product1.description);
    expect(result.products[0].salesPrice).toEqual(product1.salesPrice);
    expect(result.products[1].id).toEqual(product2.id);
    expect(result.products[1].name).toEqual(product2.name);
    expect(result.products[1].description).toEqual(product2.description);
    expect(result.products[1].salesPrice).toEqual(product2.salesPrice);
  });
});