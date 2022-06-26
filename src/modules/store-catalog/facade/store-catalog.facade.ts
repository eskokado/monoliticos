import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import FindAllProductsUseCase from "../usecases/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecases/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDto, FindByIdStoreCatalogFacadeInputDto, FindByIdStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface";

export interface UseCasesProps {
  findUseCase: FindProductUseCase;
  findAllUseCase: FindAllProductsUseCase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findUseCase: FindProductUseCase;
  private _findAllUseCase: FindAllProductsUseCase;

  constructor(useCasesProps: UseCasesProps) {
    this._findUseCase = useCasesProps.findUseCase;
    this._findAllUseCase = useCasesProps.findAllUseCase;
  }

  findById(id: FindByIdStoreCatalogFacadeInputDto): Promise<FindByIdStoreCatalogFacadeOutputDto> {
    return this._findUseCase.execute(id);
  }
  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return this._findAllUseCase.execute();
  }
}