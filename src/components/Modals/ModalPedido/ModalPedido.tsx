import { SelectChangeEvent, Dialog, DialogTitle, DialogContent, Grid, Typography, Select, MenuItem, DialogActions } from "@mui/material";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Estado } from "../../../types/enums/Estado";
import Pedido from "../../../types/Pedido";

interface ModalPedidoProps {
    open: boolean;
    onClose: () => void;
    pedido: Pedido | null;
    onSave: (pedido: Pedido) => void;
}

const ModalPedido: React.FC<ModalPedidoProps> = ({ open, onClose, pedido, onSave }) => {
    const [estado, setEstado] = useState<Estado>(Estado.PENDIENTE);
    const [availableStates, setAvailableStates] = useState<Estado[]>(Object.values(Estado));

    useEffect(() => {
        if (pedido) {
            setEstado(pedido.estado);
        }
    }, [pedido]);

    const handleEstadoChange = (event: SelectChangeEvent<Estado>) => {
        setEstado(event.target.value as Estado);
    };

    const handleSave = () => {
        if (pedido) {
            onSave({ ...pedido, estado });
        }
    };

    if (!pedido) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle style={{ fontSize: '24px', marginBottom: '20px' }}>Detalles del Pedido</DialogTitle>
            <DialogContent dividers style={{ fontSize: '20px', marginBottom: '20px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant="body1" style={{ fontSize: '18px', lineHeight: '1.6' }}>
                        <strong>Hora Estimada Finalización:</strong> {pedido.horaEstimadaFinalizacion?.toString() || 'N/A'}
                        </Typography>
                        <Typography variant="body1" style={{ fontSize: '18px', lineHeight: '1.6' }}>
                            <strong>Total:</strong> {pedido.total}
                        </Typography>
                        <Typography variant="body1" style={{ fontSize: '18px', lineHeight: '1.6' }}>
                            <strong>Total Costo:</strong> {pedido.totalCosto}
                        </Typography>
                        <Typography variant="body1" style={{ fontSize: '18px', lineHeight: '1.6' }}>
                            <strong>Tipo Envio:</strong> {pedido.tipoEnvio}
                        </Typography>
                        <Typography variant="body1" style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '10px' }}>
                            <strong>Estado:</strong>
                        </Typography>
                        <Select value={estado} onChange={handleEstadoChange} fullWidth style={{ fontSize: '18px' }}>
                            {availableStates.map((state) => (
                                <MenuItem key={state} value={state} style={{ fontSize: '18px' }}>
                                    {state}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" style={{ fontSize: '18px', lineHeight: '1.6' }}>
                            <strong>Forma Pago:</strong> {pedido.formaPago}
                        </Typography>
                        <Typography variant="body1" style={{ fontSize: '18px', lineHeight: '1.6' }}>
                            <strong>Fecha Pedido:</strong> {pedido.fechaPedido.toString()}
                        </Typography>
                        <Typography variant="body1" style={{ fontSize: '18px', lineHeight: '1.6' }}>
                            <strong>Detalle del Pedido:</strong>
                        </Typography>
                        {pedido.detallePedidos.map((detalle, index) => (
                            <div key={index} style={{ marginTop: '10px' }}>
                                <Typography variant="body2" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                                    <strong>Cantidad:</strong> {detalle.cantidad}
                                </Typography>
                                <Typography variant="body2" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                                    <strong>Artículo:</strong> {detalle.articulo.denominacion}
                                </Typography>
                            </div>
                        ))}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions style={{ marginTop: '20px' }}>
                <Button onClick={onClose} color="primary" style={{ fontSize: '20px', backgroundColor: '#fb6376', borderColor: '#fb6376' }}>
                    Cancelar
                </Button>
                <Button onClick={handleSave} color="primary" style={{ fontSize: '20px', backgroundColor: '#fb6376', borderColor: '#fb6376' }}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalPedido;