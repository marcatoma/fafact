import { MarcaModel } from "./marca";
import { SubCategoriaModel } from "./sub-categoria.model";
import { UnidadMedidaModel } from "./unidad-medida.model";

export interface ProductoModel {
    idProducto?: number;
    codigo?: String;
    codigo_aux?: String;
    nombreProducto?: String;
    descripcion?: String;
    precio?: number;
    stock?: number;
    estado?: boolean;
    unidadMedida?: UnidadMedidaModel;
    subCategoria?: SubCategoriaModel;
    iva?: boolean;
    inventariable?: boolean;
    marca?:MarcaModel;
}
