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
});