import CategoriaDto from "../../types/dto/CategoriaDto";
import BackendClient from "../BackendClient";

interface CategoriasSDTO extends BackendClient<CategoriaDto> {
    denominacion: string,
    esInsumo: false,
}

export default CategoriasSDTO;