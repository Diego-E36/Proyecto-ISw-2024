"use strict";
import { getAllBicicletasPorAro,
        getAllBicicletasTipo,
        getAllBicicletasVenta,
        getBicicletasPorAroMes,
        getBicicletasPorAroUltimosTresMeses,
        getBicicletasPorAroYear,
        getBicicletasPorTipoAño,
        getBicicletasPorTipoMes,
        getBicicletasPorTipoUltimosTresMeses,
        getBicicletasVentaMes,
        getBicicletasVentaUltimosTresMeses,
        getBicicletasVentaYear 
        }from "../services/estadisticasBici.service.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

// Obtener todas las bicicletas por tipo
export async function getAllBicicletasTipoController(req, res) {
    try {
        const [allBicicletasTipo, error] = await getAllBicicletasTipo();

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener todas las bicicletas por tipo", error);
        }

        if (!allBicicletasTipo || allBicicletasTipo.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas");
        }

        handleSuccess(res, 200, "Bicicletas por tipo obtenidas con éxito", allBicicletasTipo);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

// Obtener bicicletas por tipo filtrado por meses y año
export async function getBicicletasPorTipoMesController(req, res) {
    const mes = parseInt(req.params.mes, 10);
    const year = parseInt(req.params.year, 10);
    const añoActual = new Date().getFullYear();

    // Valida que el mes que sea un número válido entre 1 y 12
    if (isNaN(mes) || mes < 1 || mes > 12) {
        return handleErrorClient(res, 400, "El mes debe ser un número entre 1 y 12");
    }

    //Valida el año sea entre 2023 y año actual
    if (isNaN(year) || year < 2023 || year > añoActual) {
        return handleErrorClient(res, 400, `El año debe ser un número entre 2023 y ${añoActual}`);
    }
    
    try {
        const [bicicletasPorTipo, error] = await getBicicletasPorTipoMes(mes, year);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener bicicletas por tipo, por mes y año", error);
        }

        if (!bicicletasPorTipo || bicicletasPorTipo.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas para este mes y año");
        }

        handleSuccess(res, 200, "Bicicletas por tipo obtenidas con éxito", bicicletasPorTipo);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtener bicicletas por tipo filtrado por año
export async function getBicicletasPorTipoAñoController(req, res) {
    const year = parseInt(req.params.year, 10);
    const añoActual = new Date().getFullYear();

    // Valida que el año sea un número válido y no exceda el año actual
    if (isNaN(year) || year < 2023 || year > añoActual) {
        return handleErrorClient(res, 400, `El año debe ser un número entre 2023 y ${añoActual}`);
    }

    try {
        const [bicicletasPorTipoAño, error] = await getBicicletasPorTipoAño(year);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener bicicletas por tipo y año", error);
        }

        if (!bicicletasPorTipoAño || bicicletasPorTipoAño.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas para este año");
        }

        handleSuccess(res, 200, "Bicicletas por tipo obtenidas con éxito", bicicletasPorTipoAño);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtener bicicletas por tipo en los últimos 3 meses
export async function getBicicletasPorTipoUltimosTresMesesController(req, res) {
    try {
        const [bicicletasPorTipoUltimosTresMeses, error] = await getBicicletasPorTipoUltimosTresMeses();

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener bicicletas por tipo en los últimos 3 meses", error);
        }

        if (!bicicletasPorTipoUltimosTresMeses || bicicletasPorTipoUltimosTresMeses.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas en los últimos 3 meses");
        }

        handleSuccess(res, 200, "Bicicletas por tipo en los últimos 3 meses obtenidas con éxito", bicicletasPorTipoUltimosTresMeses);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtener todas las bicicletas a la venta
export async function getAllBicicletasVentaController(req, res) {
    try {
        const [bicicletasVenta, error] = await getAllBicicletasVenta();

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener todas las bicicletas a la venta", error);
        }

        if (!bicicletasVenta || bicicletasVenta.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas a la venta registradas");
        }

        handleSuccess(res, 200, "Bicicletas a la venta obtenidas con éxito", bicicletasVenta);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

// Obtener bicicletas a la venta filtrado por meses y año
export async function getBicicletasVentasMesController(req, res) {
    const mes = parseInt(req.params.mes, 10);
    const year = parseInt(req.params.year, 10);
    const añoActual = new Date().getFullYear();

    //Valida que el mes que sea un número válido entre 1 y 12
    if (isNaN(mes) || mes < 1 || mes > 12) {
        return handleErrorClient(res, 400, "El mes debe ser un número entre 1 y 12");
    }

    //Valida el año sea entre 2023 y año actual
    if (isNaN(year) || year < 2023 || year > añoActual) {
        return handleErrorClient(res, 400, `El año debe ser un número entre 2023 y ${añoActual}`);
    }


    try {
        const [bicicletasVendidas, error] = await getBicicletasVentaMes(mes, year);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener bicicletas a la venta", error);
        }

        if (!bicicletasVendidas || bicicletasVendidas.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas a la venta registradas");
        }

        handleSuccess(res, 200, "Bicicletas a la venta obtenidas con éxito", bicicletasVendidas);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtener bicicletas a la venta filtrado por año
export async function getBicicletasVentaYearController(req, res) {
    const year = parseInt(req.params.year, 10);
    const añoActual = new Date().getFullYear();

    // Valida que el año sea un número válido y no exceda el año actual
    if (isNaN(year) || year < 2023 || year > añoActual) {
        return handleErrorClient(res, 400, `El año debe ser un número entre 2023 y ${añoActual}`);
    }

    try {
        const [bicicletasVentaYear, error] = await getBicicletasVentaYear(year);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener bicicletas a la venta por año", error);
        }

        if (!bicicletasVentaYear || bicicletasVentaYear.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas a la venta para este año");
        }

        handleSuccess(res, 200, "Bicicletas a la venta obtenidas con éxito", bicicletasVentaYear);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtener bicicletas a la venta en los últimos 3 meses sin contar el actual
export async function getBicicletasVentaUltimosTresMesesController(req, res) {
    try {
        const [bicicletasVentaUltimosTresMeses, error] = await getBicicletasVentaUltimosTresMeses();

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener bicicletas a la venta en los últimos 3 meses", error);
        }

        if (!bicicletasVentaUltimosTresMeses || bicicletasVentaUltimosTresMeses.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas a la venta en los últimos 3 meses");
        }

        handleSuccess(res, 200, "Bicicletas a la venta en los últimos 3 meses obtenidas con éxito", bicicletasVentaUltimosTresMeses);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

// Obtener todas las bicicletas por aro
export async function getAllBicicletasPorAroController(req, res) {
    try {
        const [bicicletasPorAro, error] = await getAllBicicletasPorAro();

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener todas las bicicletas por aro", error);
        }

        if (!bicicletasPorAro || bicicletasPorAro.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas");
        }

        handleSuccess(res, 200, "Bicicletas por aro obtenidas con éxito", bicicletasPorAro);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtener bicicletas por Aro filtrado por meses y año
export async function getBicicletasPorAroMesController(req, res) {
    const mes = parseInt(req.params.mes, 10);
    const year = parseInt(req.params.year, 10);
    const añoActual = new Date().getFullYear();

    //Valida que el mes que sea un número válido entre 1 y 12
    if (isNaN(mes) || mes < 1 || mes > 12) {
        return handleErrorClient(res, 400, "El mes debe ser un número entre 1 y 12");
    }

    //Valida el año sea entre 2023 y año actual
    if (isNaN(year) || year < 2023 || year > añoActual) {
        return handleErrorClient(res, 400, `El año debe ser un número entre 2023 y ${añoActual}`);
    }

    try {
        const [bicicletasPorAro, error] = await getBicicletasPorAroMes(mes, year);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener bicicletas por aro y mes", error);
        }

        if (!bicicletasPorAro || bicicletasPorAro.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas para este mes");
        }

        handleSuccess(res, 200, "Bicicletas por aro obtenidas con éxito", bicicletasPorAro);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtener bicicletas por aro filtrado por año
export async function getBicicletasPorAroYearController(req, res) {
    const year = parseInt(req.params.year, 10);
    const añoActual = new Date().getFullYear();

    // Valida que el año sea un número válido y no exceda el año actual
    if (isNaN(year) || year < 2023 || year > añoActual) {
        return handleErrorClient(res, 400, `El año debe ser un número entre 2023 y ${añoActual}`);
    }

    try {
        const [bicicletasPorAroYear, error] = await getBicicletasPorAroYear(year);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener bicicletas por aro en el año", error);
        }

        if (!bicicletasPorAroYear || bicicletasPorAroYear.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas por aro para este año");
        }

        handleSuccess(res, 200, "Bicicletas a la venta obtenidas con éxito", bicicletasPorAroYear);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtener las bicicletas por aro filtrado por los últimos 3 meses sin contar el actual
export async function getBicicletasPorAroUltimosTresMesesController(req, res) {
    try {
        const [bicicletasPorAroUltimosTresMeses, error] = await getBicicletasPorAroUltimosTresMeses();

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener bicicletas por aro en los últimos 3 meses", error);
        }

        if (!bicicletasPorAroUltimosTresMeses || bicicletasPorAroUltimosTresMeses.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas por aro en los últimos 3 meses");
        }

        handleSuccess(res, 200, "Bicicletas por aro en los últimos 3 meses obtenidas con éxito", bicicletasPorAroUltimosTresMeses);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}