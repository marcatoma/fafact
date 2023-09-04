import { ProductoModel } from "./producto.model";

export interface ModoCapturaModel {
    queryCodigo?: string;
    queryNombre?: string;
    producto?: ProductoModel;
    subTotal?: number;
}