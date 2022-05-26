import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface UseCasesProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUseCase: UseCaseInterface;
  private _checkStockUseCase: UseCaseInterface;

  constructor(useCaseProps: UseCasesProps) {
    this._addUseCase = useCaseProps.addUseCase;
    this._checkStockUseCase = useCaseProps.stockUseCase;
  }

  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    return this._addUseCase.execute(input);
  }
  checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUseCase.execute(input);
  }  
}