import { CantonModel } from "./canton.model";

export interface CiudadModel {
    id?: number;
    ciudad?: string;
    canton?: CantonModel;
}
