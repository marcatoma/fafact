import { CategoriaModel } from "./categoria";

export interface SubCategoriaModel {
    id_sub_categoria?: number;
    descripcion?: String;
    estado?: boolean;
    categoria?: CategoriaModel;
}
