import { CantonModel } from "./canton.model";
import { TipoIdentifiacionModel } from "./tipo-identifiacion.model";

export interface PersonaModel {
    idPersona?: number;
    nombreRazonSocial?: String;
    tipoIdentificacion?: TipoIdentifiacionModel;
    identificacion?: String;
    direccion?: String;
    celular?: String;
    email?: String;
    observacion?: String;
    estado?: boolean;
    canton?: CantonModel;
}
