import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";

export interface UseCasesProps {
  addUseCase: UseCaseInterface;
  findUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _addUseCase: UseCaseInterface;
  private _findUseCase: UseCaseInterface;

  constructor(useCaseProps: UseCasesProps) {
    this._addUseCase = useCaseProps.addUseCase;
    this._findUseCase = useCaseProps.findUseCase;
  }

  addClient(input: AddClientFacadeInputDto): Promise<void> {
    return this._addUseCase.execute(input);
  }
  findClient(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
    return this._findUseCase.execute(input);
  }  
}