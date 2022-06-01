import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUseCase from "./find-all-products.usecase";

const product1 = new Product({
  id: new Id("123"),
  name: "Product 1",
  description: "Product 1 description",
  salesPrice: 100,
});

const product2 = new Product({
  id: new Id("234"),
  name: "Product 2",
  description: "Product 2 description",
  salesPrice: 120,
});

const MockRepository = () => {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    findById: jest.fn()
  }
}

describe("find all product usecase unit test", () => {
  it("call findAllProducts should return product list", async () => {
    const productRepository = MockRepository();    
    const usecase = new FindAllProductsUseCase(productRepository);

    const result = await usecase.execute();

    expect(productRepository.findAll).toHaveBeenCalled();
    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe(product1.id.id);
    expect(result.products[0].name).toBe(product1.name);
    expect(result.products[0].description).toBe(product1.description);
    expect(result.products[0].salesPrice).toBe(product1.salesPrice);
    expect(result.products[1].id).toBe(product2.id.id);
    expect(result.products[1].name).toBe(product2.name);
    expect(result.products[1].description).toBe(product2.description);
    expect(result.products[1].salesPrice).toBe(product2.salesPrice);
  })
})