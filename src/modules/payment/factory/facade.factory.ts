import TransactionFacade from "../facade/transaction.facade";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUsecase from "../usecase/process-payment/process-paymento.usecase";

export default class TransactionFactory {
 static create() {
    const transactionRepository = new TransactionRepository();
    const processPaymentUseCase = new ProcessPaymentUsecase(transactionRepository);
    const transactionFacade = new TransactionFacade({
      saveUseCase: processPaymentUseCase,
    });
    return transactionFacade;
  }  
}