export interface FindClientFacadeInputDto {
  id: string;
}

export interface FindClientFacadeOutputDto {
  id: string;
  name: string;
  email: string;
  address: string;
}

export interface AddClientFacadeInputDto {
  id?: string;
  name: string;
  email: string;
  address: string;
}

export default interface ClientAdmFacadeInterface {
  addClient(input: AddClientFacadeInputDto): Promise<void>;
  findClient(id: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}