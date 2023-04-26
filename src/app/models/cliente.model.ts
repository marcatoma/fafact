import { PersonaModel } from "./persona.model";
import { TipoClienteModel } from "./tipo-cliente.model";

export interface ClienteModel extends PersonaModel{
    tipoCliente?: TipoClienteModel; 
}
