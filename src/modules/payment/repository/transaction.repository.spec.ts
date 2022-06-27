import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/transaction";
import TransactionModel from "./transaction.model";
import TransactionRepository from "./transaction.repository";

describe("TransactionRepository test", () => {
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

  it("should save a transaction", async () => {
    const transactionProps = {
      id: new Id("1"),
      orderId: "Transaction1",
      status: "approved",
      amount: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const transaction = new Transaction(transactionProps);

    const transactionRepository = new TransactionRepository();
    await transactionRepository.save(transaction);

    const transactionDb = await TransactionModel.findOne({
      where: { id: transactionProps.id.id },
    });

    expect(transactionProps.id.id).toEqual(transactionDb.id);
    expect(transactionProps.orderId).toEqual(transactionDb.orderId);
    expect(transactionProps.status).toEqual(transactionDb.status);
    expect(transactionProps.amount).toEqual(transactionDb.amount);
    expect(transactionProps.createdAt).toEqual(transactionDb.createdAt);
    expect(transactionProps.updatedAt).toEqual(transactionDb.updatedAt);
  });
});