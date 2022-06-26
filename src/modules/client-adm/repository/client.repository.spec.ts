import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientModel from "./client.model";
import ClientRepository from "./client.repository";

describe("ClientRepository test", () => {
  let sequelize: Sequelize;

  beforeEach( async ()  => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();    
  });

  afterEach(async () => {
    await sequelize.close();
  })

  it("Should find return client", async () => {
    const createdAt = new Date();
    const updatedAt = new Date();

    const client = {
      id: "1",
      name: "Client 1",
      email: "email@client1.com",
      address: "Address Client 1",
      createdAt: createdAt,
      updatedAt: updatedAt
    }

    await ClientModel.create(client);    

    const clientRepository = new ClientRepository();

    const result = await clientRepository.find("1");

    expect(result.id.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.address).toEqual(client.address);    
  });

  it("should create a client", async () => {
    const clientProps = {
      id: new Id("1"),
      name: "Client 1",
      email: "email@client1.com",
      address: "Address Client1"
    }

    const client = new Client(clientProps);

    const clientRepository = new ClientRepository();
    await clientRepository.add(client);

    const clientDb = await ClientModel.findOne({
      where: { id: clientProps.id.id },
    });

    expect(clientProps.id.id).toEqual(clientDb.id);
    expect(clientProps.name).toEqual(clientDb.name);
    expect(clientProps.email).toEqual(clientDb.email);
    expect(clientProps.address).toEqual(clientDb.address);
  });

});