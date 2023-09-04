import { ProductoModel } from "./producto.model";

export interface DetalleVentaModel {
    id_detalle_venta?: number;
    producto_item?: ProductoModel;
    cantidad?: number;
    descuento?: number;
    importe?: number;
}
