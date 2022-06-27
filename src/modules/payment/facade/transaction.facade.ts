import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import TransactionFacadeInterface, { SaveTransactionFacadeInputDto, SaveTransactionFacadeOutputDto } from "./facade.interface";

export interface UseCasesProps {
  saveUseCase: UseCaseInterface;
}


export default class TransactionFacade implements TransactionFacadeInterface {
  private _saveUseCase: UseCaseInterface;

  constructor(useCaseProps: UseCasesProps) {
    this._saveUseCase = useCaseProps.saveUseCase;
  }

  save(input: SaveTransactionFacadeInputDto): Promise<SaveTransactionFacadeOutputDto> {
    return this._saveUseCase.execute(input);
  }
  
}