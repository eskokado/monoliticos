import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
  id: new Id("1"),
  name: "Client 1",
  email: "email@client1.com",
  address: "Address client 1"
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(client)
  }
}

describe("find a product usecase unit test", () => {
  it("should find a product", async () => {
    const clientRepository = MockRepository();
    const usecase = new FindClientUseCase(clientRepository);

    const input = {
      id: "1"
    }

    const result = await usecase.execute(input);

    expect(clientRepository.find).toHaveBeenCalled();
    expect(result.id).toBe(client.id.id);
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
    expect(result.address).toBe(client.address);
  });
});