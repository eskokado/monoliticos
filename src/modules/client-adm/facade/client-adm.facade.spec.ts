import { Sequelize } from "sequelize-typescript";
import ClientAdmFacadeFactory from "../factory/facade.factory";
import ClientModel from "../repository/client.model";

describe("ClientAdmFacade test", () => {
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

  it("should create a client", async () => {
   const clientFacade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Client 1",
      email: "email@client1.com",
      address: "Address client 1"
    }

    await clientFacade.addClient(input);

    const clientDb = await ClientModel.findOne({
      where: { id: input.id },
    });

    expect(input.id).toEqual(clientDb.id);
    expect(input.name).toEqual(clientDb.name);
    expect(input.email).toEqual(clientDb.email);
    expect(input.address).toEqual(clientDb.address); 
   });

  it("should find a client", async () => {
    const client = {
      id: "1",
      name: "Client 1",
      email: "email@client1.com",
      address: "Address Client 1",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const facade = ClientAdmFacadeFactory.create();
    await ClientModel.create(client);

    const result = await facade.findClient({id: "1"});

    expect(result.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.address).toEqual(client.address);
  });
      
});