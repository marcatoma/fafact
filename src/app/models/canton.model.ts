import { ProvinciaModel } from "./provincia.model";

export interface CantonModel {
    idCanton?: number;
    codigoCanton?: string;
    nombreCanton?: string;
    provincia?: ProvinciaModel;
    composeCanton?: string;
}
