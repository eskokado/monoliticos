import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUsecase from "./process-paymento.usecase";

describe("ProcessPayment test", () => {
  it("Process payment approved", async () => {
    const transaction = new Transaction({
      id: new Id("1"),
      orderId: "order1",
      amount: 150,
      status: "approved",
      createdAt: new Date(),
      updatedAt: new Date()
    }); 
    const MockRepository = () => {
      return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction))
      }
    }
    const transactionRepository = MockRepository();
    const usecase = new ProcessPaymentUsecase(transactionRepository);
    const input = {
      orderId: transaction.orderId,
      amount: transaction.amount,
    }
    const result = await usecase.execute(input);

    expect(transactionRepository.save).toHaveBeenCalled();
    expect(result.transactionId).toBe(transaction.id.id);
    expect(result.orderId).toBe(transaction.orderId);
    expect(result.amount).toBe(transaction.amount);
    expect(result.status).toBe(transaction.status);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });

  it("Process payment declined", async () => {
    const transaction = new Transaction({
      id: new Id("1"),
      orderId: "order1",
      amount: 90,
      status: "declined",
      createdAt: new Date(),
      updatedAt: new Date()
    }); 
    const MockRepository = () => {
      return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction))
      }
    }
    const transactionRepository = MockRepository();
    const usecase = new ProcessPaymentUsecase(transactionRepository);
    const input = {
      orderId: transaction.orderId,
      amount: transaction.amount,
    }
    const result = await usecase.execute(input);

    expect(transactionRepository.save).toHaveBeenCalled();
    expect(result.transactionId).toBe(transaction.id.id);
    expect(result.orderId).toBe(transaction.orderId);
    expect(result.amount).toBe(transaction.amount);
    expect(result.status).toBe(transaction.status);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });

});