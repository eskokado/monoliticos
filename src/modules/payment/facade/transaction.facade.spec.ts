import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import TransactionFactory from "../factory/facade.factory";
import TransactionModel from "../repository/transaction.model";

describe("TransactionFacade test", () => {
  let sequelize: Sequelize;

  beforeEach( async ()  => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([TransactionModel]);
    await sequelize.sync();    
  });

  afterEach(async () => {
    await sequelize.close();
  })

  it("should save a Transaction", async () => {
    const transactionFacade = TransactionFactory.create();

    const input = {
      orderId: "1",
      amount: 10
    }

    const transaction = await transactionFacade.save(input);

    const transactionDb = await TransactionModel.findOne({
      where: { id: transaction.transactionId },
    });

    expect(transaction.transactionId).toEqual(transactionDb.id);
    expect(transaction.orderId).toEqual(transactionDb.orderId);
    expect(transaction.status).toEqual(transactionDb.status);
    expect(transaction.amount).toEqual(transactionDb.amount);
  });
});