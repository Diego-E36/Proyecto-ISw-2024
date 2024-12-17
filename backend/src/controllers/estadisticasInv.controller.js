"use strict";
import { getDistribucionProductosPorProveedor,
        getInventarioBajoStockRestockDia,
        getInventarioBajoStockRestockMesYear,
        getInventarioBajoStockRestockUltimosTresMeses,
        getInventarioBajoStockRestockYear,
        getInventarioNombreCantidadDia,
        getInventarioNombreCantidadMesYear,
        getInventarioNombreCantidadUltimosTresMeses,
        getInventarioNombreCantidadYear,
        getInventarioProveedorDia,
        getInventarioProveedorMesYear,
        getInventarioProveedorUltimosTresMeses,
        getInventarioProveedorYear,
        getNombreYCantidadInventario,
        getProductosBajoStockYRestockSugerido,
        } from "../services/estadisticasInv.service.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

// Obtiene el nombre del producto y la cantidad
export async function getNombreYCantidadInventarioController(req, res) {
    try {
        const [inventario, error] = await getNombreYCantidadInventario();

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener el nombre y la cantidad del inventario", error);
        }

        if (!inventario || inventario.length === 0) {
            return handleSuccess(res, 204, "No hay productos en el inventario");
        }

        handleSuccess(res, 200, "Nombre y cantidad del inventario obtenidos con éxito", inventario);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtiene el nombre del stock de inventario y la cantidad filtrado por día, mes y año
export async function getInventarioNombreCantidadDiaController(req, res) {
    const dia = parseInt(req.params.dia, 10);
    const mes = parseInt(req.params.mes, 10);
    const year = parseInt(req.params.year, 10);
    const añoActual = new Date().getFullYear();

    if (isNaN(dia) || dia < 1 || dia > 31) {
        return handleErrorClient(res, 400, "El día debe ser un número entre 1 y 31");
    }

    if (isNaN(mes) || mes < 1 || mes > 12) {
        return handleErrorClient(res, 400, "El mes debe ser un número entre 1 y 12");
    }

    if (isNaN(year) || year < 2023 || year > añoActual) {
        return handleErrorClient(res, 400, `El año debe ser un número entre 2023 y ${añoActual}`);
    }

    try {
        const [inventarioNombreCantidadDia, error] = await getInventarioNombreCantidadDia(dia, mes, year);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener el nombre y cantidad del inventario por día, mes y año", error);
        }

        if (!inventarioNombreCantidadDia || inventarioNombreCantidadDia.length === 0) {
            return handleSuccess(res, 204, "No hay productos registrados para el día, mes y año especificado");
        }

        handleSuccess(res, 200, "Nombre y cantidad del inventario obtenidos con éxito por día, mes y año", inventarioNombreCantidadDia);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtiene el nombre del stock de inventario y la cantidad filtrado por mes y año
export async function getInventarioNombreCantidadMesYearController (req, res) {
    const mes = parseInt(req.params.mes, 10);
    const year = parseInt(req.params.year, 10);
    const añoActual = new Date().getFullYear();

    if (isNaN(mes) || mes < 1 || mes > 12) {
        return handleErrorClient(res, 400, "El mes debe ser un número entre 1 y 12");
    }
    if (isNaN(year) || year < 2023 || year > añoActual) {
        return handleErrorClient(res, 400, `El año debe ser un número entre 2023 y ${añoActual}`);
    }

    try {
        const [inventarioNombreCantidad, error] = await getInventarioNombreCantidadMesYear(mes, year);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener el nombre y cantidad del inventario por mes y año", error);
        }
        if (!inventarioNombreCantidad || inventarioNombreCantidad.length === 0) {
            return handleSuccess(res, 204, "No hay inventario registradas para el mes y año ");
        }

        handleSuccess(res, 200, "Nombre y cantidad del inventario obtenidas con éxito por mes y año", inventarioNombreCantidad);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
} 

//Obtiene el nombre de stock de inventario y cantidad filtrado por año
export async function getInventarioNombreCantidadYearController(req, res) {
    const year = parseInt(req.params.year, 10);
    const añoActual = new Date().getFullYear();

    if (isNaN(year) || year < 2023 || year > añoActual) {
        return handleErrorClient(res, 400, `El año debe ser un número entre 2023 y ${añoActual}`);
    }

    try {
        const [inventarioNombreCantidadYear, error] = await getInventarioNombreCantidadYear(year);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener el nombre y cantidad del inventario por año", error);
        }

        if (!inventarioNombreCantidadYear || inventarioNombreCantidadYear.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas para el año");
        }

        handleSuccess(res, 200, "Nombre y cantidad del inventario obtenidas con éxito por año", inventarioNombreCantidadYear);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtener nombre de stock de inventario y cantidad filtrado por últimos tres meses sin contar el actual
export async function getInventarioNombreCantidadUltimosTresMesesController(req, res) {
    try {
        const [inventarioNombreCantidadUltimosTresMeses, error] = await getInventarioNombreCantidadUltimosTresMeses();

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener el nombre y cantidad del inventario por los últimos tres meses", error);
        }

        if (!inventarioNombreCantidadUltimosTresMeses || inventarioNombreCantidadUltimosTresMeses.length === 0) {
            return handleSuccess(res, 204, "No hay productos registrados para los últimos tres meses");
        }

        handleSuccess(res, 200, "Nombre y cantidad del inventario obtenidas con éxito por los últimos tres meses", inventarioNombreCantidadUltimosTresMeses);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtiene la distribución de productos por todos los proveedores
export async function getDistribucionProductosPorProveedorController(req, res) {
    try {
        const [productosPorProveedor, error] = await getDistribucionProductosPorProveedor();

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener la distribución de productos por proveedor", error);
        }

        handleSuccess(res, 200, "Distribución de productos por proveedor obtenida con éxito", productosPorProveedor);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtiene productos por proveedor y cantidad filtrado por día, mes y año
export async function getInventarioProveedorDiaController(req, res) {
    const dia = parseInt(req.params.dia, 10);
    const mes = parseInt(req.params.mes, 10);
    const year = parseInt(req.params.year, 10);
    const añoActual = new Date().getFullYear();

    if (isNaN(dia) || dia < 1 || dia > 31) {
        return handleErrorClient(res, 400, "El día debe ser un número entre 1 y 31");
    }
    if (isNaN(mes) || mes < 1 || mes > 12) {
        return handleErrorClient(res, 400, "El mes debe ser un número entre 1 y 12");
    }
    if (isNaN(year) || year < 2023 || year > añoActual) {
        return handleErrorClient(res, 400, `El año debe ser un número entre 2023 y ${añoActual}`);
    }

    try {
        const [inventarioProveedorDia, error] = await getInventarioProveedorDia(dia, mes, year);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener productos por proveedor y cantidad filtrado por día, mes y año", error);
        }
        if (!inventarioProveedorDia || inventarioProveedorDia.length === 0) {
            return handleSuccess(res, 204, "No hay productos registrados para el día, mes y año especificado");
        }

        handleSuccess(res, 200, "Productos por proveedor y cantidad filtrado por día, mes y año obtenidos con éxito", inventarioProveedorDia);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtener productos por proveedor y cantidad filtrado por mes y año
export async function getInventarioProveedorMesYearController(req, res) {
    const mes = parseInt(req.params.mes, 10);
    const year = parseInt(req.params.year, 10);
    const añoActual = new Date().getFullYear();

    if (isNaN(mes) || mes < 1 || mes > 12) {
        return handleErrorClient(res, 400, "El mes debe ser un número entre 1 y 12");
    }
    if (isNaN(year) || year < 2023 || year > añoActual) {
        return handleErrorClient(res, 400, `El año debe ser un número entre 2023 y ${añoActual}`);
    }

    try {
        const [inventarioProveedorMesYear, error] = await getInventarioProveedorMesYear(mes, year);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener productos por proveedor y cantidad filtrado por mes y año", error);
        }
        if (!inventarioProveedorMesYear || inventarioProveedorMesYear.length === 0) {
            return handleSuccess(res, 204, "No hay productos registrados para el mes y año especificado");
        }

        handleSuccess(res, 200, "Productos por proveedor y cantidad filtrado por mes y año obtenidos con éxito", inventarioProveedorMesYear);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtiene productos por proveedor y cantidad filtrado por año
export async function getInventarioProveedorYearController(req, res) {
    const year = parseInt(req.params.year, 10);
    const añoActual = new Date().getFullYear();

    if (isNaN(year) || year < 2023 || year > añoActual) {
        return handleErrorClient(res, 400, `El año debe ser un número entre 2023 y ${añoActual}`);
    }

    try {
        const [inventarioProveedorYear, error] = await getInventarioProveedorYear(year);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener productos por proveedor y cantidad filtrado por año", error);
        }
        if (!inventarioProveedorYear || inventarioProveedorYear.length === 0) {
            return handleSuccess(res, 204, "No hay productos registrados para el año especificado");
        }

        handleSuccess(res, 200, "Productos por proveedor y cantidad filtrado por año obtenidos con éxito", inventarioProveedorYear);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtiene productos por proveedor y cantidad filtrado por los últimos tres meses sin contar el actual
export async function getInventarioProveedorUltimosTresMesesController(req, res) {
    try {
        const [inventarioProveedorUltimosTresMeses, error] = await getInventarioProveedorUltimosTresMeses();

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener productos por proveedor y cantidad filtrado por los últimos tres meses", error);
        }
        if (!inventarioProveedorUltimosTresMeses || inventarioProveedorUltimosTresMeses.length === 0) {
            return handleSuccess(res, 204, "No hay productos registrados para los últimos tres meses");
        }

        handleSuccess(res, 200, "Productos por proveedor y cantidad filtrado por los últimos tres meses obtenidos con éxito", inventarioProveedorUltimosTresMeses);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtiene productos con bajo stock y restock sugerido
export async function getProductosBajoStockYRestockSugeridoController(req, res) {
    try {
        const [productosBajoStock, error] = await getProductosBajoStockYRestockSugerido();

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener productos con bajo stock y restock sugerido", error);
        }
        if (!productosBajoStock || productosBajoStock.length === 0) {
            return handleSuccess(res, 204, "No hay productos con bajo stock");
        }

        handleSuccess(res, 200, "Productos con bajo stock y restock sugerido obtenidos con éxito", productosBajoStock);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtiene productos con bajo stock y restock sugerido filtrado por día, mes y año
export async function getInventarioBajoStockRestockDiaController(req, res) {
    const dia = parseInt(req.params.dia, 10);
    const mes = parseInt(req.params.mes, 10);
    const year = parseInt(req.params.year, 10);
    const añoActual = new Date().getFullYear();

    if (isNaN(dia) || dia < 1 || dia > 31) {
        return handleErrorClient(res, 400, "El día debe ser un número entre 1 y 31");
    }
    if (isNaN(mes) || mes < 1 || mes > 12) {
        return handleErrorClient(res, 400, "El mes debe ser un número entre 1 y 12");
    }
    if (isNaN(year) || year < 2023 || year > añoActual) {
        return handleErrorClient(res, 400, `El año debe ser un número entre 2023 y ${añoActual}`);
    }

    try {
        const [inventarioBajoStockRestockDia, error] = await getInventarioBajoStockRestockDia(dia, mes, year);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener productos con bajo stock y restock sugerido por día, mes y año", error);
        }
        if (!inventarioBajoStockRestockDia || inventarioBajoStockRestockDia.length === 0) {
            return handleSuccess(res, 204, "No hay productos con bajo stock y restock sugerido para el día, mes y año seleccionado");
        }

        handleSuccess(res, 200, "Productos con bajo stock y restock sugerido filtrado por día, mes y año obtenidos con éxito", inventarioBajoStockRestockDia);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtiene productos con bajo stock y restock sugerido filtrado por mes y año
export async function getInventarioBajoStockRestockMesYearController(req, res) {
    const mes = parseInt(req.params.mes, 10);
    const year = parseInt(req.params.year, 10);
    const añoActual = new Date().getFullYear();


    if (isNaN(mes) || mes < 1 || mes > 12) {
        return handleErrorClient(res, 400, "El mes debe ser un número entre 1 y 12");
    }
    if (isNaN(year) || year < 2023 || year > añoActual) {
        return handleErrorClient(res, 400, `El año debe ser un número entre 2023 y ${añoActual}`);
    }

    try {
        const [inventarioBajoStockRestockMesYear, error] = await getInventarioBajoStockRestockMesYear(mes, year);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener productos con bajo stock y restock sugerido por mes y año", error);
        }
        if (!inventarioBajoStockRestockMesYear || inventarioBajoStockRestockMesYear.length === 0) {
            return handleSuccess(res, 204, "No hay productos con bajo stock y restock sugerido para el mes y año especificado");
        }

        handleSuccess(res, 200, "Productos con bajo stock y restock sugerido filtrado por mes y año obtenidos con éxito", inventarioBajoStockRestockMesYear);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtiene productos con bajo stock y restock sugerido filtrado por año
export async function getInventarioBajoStockRestockYearController(req, res) {
    const year = parseInt(req.params.year, 10);
    const añoActual = new Date().getFullYear();

    if (isNaN(year) || year < 2023 || year > añoActual) {
        return handleErrorClient(res, 400, `El año debe ser un número entre 2023 y ${añoActual}`);
    }

    try {
        const [inventarioBajoStockRestockYear, error] = await getInventarioBajoStockRestockYear(year);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener productos con bajo stock y restock sugerido por año", error);
        }
        if (!inventarioBajoStockRestockYear || inventarioBajoStockRestockYear.length === 0) {
            return handleSuccess(res, 204, "No hay productos con bajo stock y restock sugerido para el año especificado");
        }

        handleSuccess(res, 200, "Productos con bajo stock y restock sugerido filtrado por año obtenidos con éxito", inventarioBajoStockRestockYear);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtiene productos con bajo stock y restock sugerido filtrado por los últimos tres meses sin contar el actual
export async function getInventarioBajoStockRestockUltimosTresMesesController(req, res) {
    try {
        const [inventarioBajoStockRestockUltimosTresMeses, error] = await getInventarioBajoStockRestockUltimosTresMeses();

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener productos con bajo stock y restock sugerido por los últimos tres meses", error);
        }
        if (!inventarioBajoStockRestockUltimosTresMeses || inventarioBajoStockRestockUltimosTresMeses.length === 0) {
            return handleSuccess(res, 204, "No hay productos con bajo stock y restock sugerido para los últimos tres meses");
        }

        handleSuccess(res, 200, "Productos con bajo stock y restock sugerido filtrado por los últimos tres meses obtenidos con éxito", inventarioBajoStockRestockUltimosTresMeses);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}