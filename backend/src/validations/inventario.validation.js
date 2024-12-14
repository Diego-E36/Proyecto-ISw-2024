"use strict";
import Joi from "joi";

export const invQueryValidation = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
    numeroSerie: Joi.string()
        .min(5)
        .max(50)
        .pattern(/^[a-zA-Z0-9]+$/)
        .uppercase()
        .messages({
            "string.pattern.base": "El número de serie solo puede contener letras, números y espacios.",
            "string.min": "El número de serie debe tener como mínimo 5 caracteres.",
            "string.max": "El número de serie debe tener como máximo 50 caracteres.",
        }),
})

export const invBodyValidation = Joi.object({
    numeroSerie: Joi.string()
        .min(5)
        .max(50)
        .pattern(/^[a-zA-Z0-9]+$/)
        .uppercase()
        .messages({
            "string.pattern.base": "El número de serie solo puede contener letras, números y espacios.",
            "string.min": "El número de serie debe tener como mínimo 5 caracteres.",
            "string.max": "El número de serie debe tener como máximo 50 caracteres.",
        }),
    nombreStock: Joi.string()
        .min(5)
        .max(255)
        .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.pattern.base": "El nombre del stock solo puede contener letras, números y espacios.",
            "string.min": "El nombre del stock debe tener como mínimo 5 caracteres.",
            "string.max": "El nombre del stock debe tener como máximo 255 caracteres.",
        }),
    cantidadStock: Joi.number()
        .integer()
        .positive()
        .allow(0)
        .messages({
            "number.base": "La cantidad de stock debe ser un número.",
            "number.integer": "La cantidad de stock debe ser un número entero.",
            "number.positive": "La cantidad de stock debe ser un número positivo.",
        }),
    descripcionUnidad: Joi.string()
        .min(3)
        .max(100)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.pattern.base": "La descripción de la unidad solo puede contener letras y espacios.",
            "string.min": "La descripción de la unidad debe tener como mínimo 3 caracteres.",
            "string.max": "La descripción de la unidad debe tener como máximo 100 caracteres.",
        }),
    precioUnidad: Joi.number()
        .integer()
        .positive()
        .allow(0)
        .messages({
            "number.base": "El precio de la unidad debe ser un número.",
            "number.integer": "El precio de la unidad debe ser un número entero.",
            "number.positive": "El precio de la unidad debe ser un número positivo.",
        }),
    marcaUnidad: Joi.string()
        .min(3)
        .max(50)
        .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.pattern.base": "La marca de la unidad solo puede contener letras, números y espacios.",
            "string.min": "La marca de la unidad debe tener como mínimo 3 caracteres.",
            "string.max": "La marca de la unidad debe tener como máximo 50 caracteres.",
        }),
    id_proveedor: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id del proveedor debe ser un número.",
            "number.integer": "El id del proveedor debe ser un número entero.",
            "number.positive": "El id del proveedor debe ser un número positivo.",
        }),
    nombre_proveedor: Joi.string()
        .max(50)
        .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El nombre no puede estar vacío.",
            "string.base": "El nombre debe ser de tipo string.",
            "string.max": "El nombre debe tener como máximo 50 caracteres.",
            "string.pattern.base": "El nombre solo puede contener letras y números.",
        }),
    restockSugerido: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El restock sugerido debe ser un número.",
            "number.integer": "El restock sugerido debe ser un número entero.",
            "number.positive": "El restock sugerido debe ser un número positivo.",
        }),
    umbralMinimo: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El umbral mínimo debe ser un número.",
            "number.integer": "El umbral mínimo debe ser un número entero.",
            "number.positive": "El umbral mínimo debe ser un número positivo.",
        }),
    boolMateriales: Joi.boolean()
        .messages({
            "boolean.base": "El valor de materiales debe ser un booleano.",
        }),
})
    .or(
        "numeroSerie",
        "nombreStock",
        "cantidadStock",
        "descripcionUnidad", 
        "precioUnidad", 
        "marcaUnidad",
        "id_proveedor",
        "nombre_proveedor",
        "restockSugerido",
        "umbralMinimo",
        "boolMateriales"
    )
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing": "Debes proporcionar al menos un parámetro: numeroSerie, nombreStock, cantidadStock, descripcionUnidad, precioUnidad, marcaUnidad, id_proveedor, nombre_proveedor, restockSugerido, umbralMinimo o boolMateriales.",
    });

