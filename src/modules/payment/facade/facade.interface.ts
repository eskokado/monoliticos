export interface SaveTransactionFacadeInputDto {
  orderId: string;
  amount: number;
}

export interface SaveTransactionFacadeOutputDto {
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default interface TransactionFacadeInterface {
  save(input: SaveTransactionFacadeInputDto): Promise<SaveTransactionFacadeOutputDto>;
}