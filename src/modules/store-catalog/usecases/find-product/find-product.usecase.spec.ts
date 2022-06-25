import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-product.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product 1 Description",
  salesPrice: 100
});

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    findById: jest.fn().mockReturnValue(product)
  }
}

describe("find a product usecase unit test", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "1"
    }

    const result = await usecase.execute(input);

    expect(productRepository.findById).toHaveBeenCalled();
    expect(result.id).toBe("1");
    expect(result.name).toBe("Product 1");
    expect(result.description).toBe("Product 1 Description");
    expect(result.salesPrice).toBe(100);
  });
});