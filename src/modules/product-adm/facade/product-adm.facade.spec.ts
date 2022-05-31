import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import { ProductModel } from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "./product-adm.facade";

describe("ProductAdmFacade test", () => {
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

  it("should create a product", async () => {
    // const productRepository = new ProductRepository();
    // const addProductUseCase = new AddProductUseCase(productRepository);
    // const productFacade = new ProductAdmFacade({
    //   addUseCase: addProductUseCase,
    //   stockUseCase: undefined
    // });

    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10
    }

    await productFacade.addProduct(input);

    const productDb = await ProductModel.findOne({
      where: { id: input.id },
    });

    expect(input.id).toEqual(productDb.id);
    expect(input.name).toEqual(productDb.name);
    expect(input.description).toEqual(productDb.description);
    expect(input.purchasePrice).toEqual(productDb.purchasePrice);
    expect(input.stock).toEqual(productDb.stock);

  });

  it("should get stock of a product", async () => {

    const productFacade = ProductAdmFacadeFactory.create();

    const addProductInput = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10
    }

    const checkStockInput = {
      productId: addProductInput.id,
    }

    await productFacade.addProduct(addProductInput);

    const result = await productFacade.checkStock(checkStockInput);

    expect(result.productId).toEqual(addProductInput.id);
    expect(result.stock).toEqual(addProductInput.stock);

  });
});