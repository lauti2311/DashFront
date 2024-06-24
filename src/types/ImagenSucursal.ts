interface IImagenSucursal extends DataModel<IImagenSucursal> {
    id: number,
    eliminado: boolean;
    url: string;
    name: string;
    idSucursal: number;
}

export default IImagenSucursal;