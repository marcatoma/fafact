import { ClienteModel } from "./cliente.model";
import { DetalleVentaModel } from "./detalle-venta.model";

export interface FacturaModel {
    id_factura?: number;
    descripcion?: string;
    observacion?: string;
    creatAt?: Date;
    cliente?: ClienteModel;
    detalleVenta?: DetalleVentaModel;
    subTotal?: number;
    ivaCero?: number;
    ivaAplicado?: number;
    total?: number;
}
