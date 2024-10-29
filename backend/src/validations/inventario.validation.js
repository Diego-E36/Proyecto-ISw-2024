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
        .messages({
            "number.base": "La cantidad de stock debe ser un número.",
            "number.integer": "La cantidad de stock debe ser un número entero.",
            "number.positive": "La cantidad de stock debe ser un número positivo.",
        }),
    colorUnidad: Joi.string()
        .min(3)
        .max(50)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.pattern.base": "El color de la unidad solo puede contener letras y espacios.",
            "string.min": "El color de la unidad debe tener como mínimo 3 caracteres.",
            "string.max": "El color de la unidad debe tener como máximo 50 caracteres.",
        }),
    precioUnidad: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El precio de la unidad debe ser un número.",
            "number.integer": "El precio de la unidad debe ser un número entero.",
            "number.positive": "El precio de la unidad debe ser un número positivo.",
        }),
    marcaUnidad: Joi.string()
        .min(3)
        .max(50)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.pattern.base": "La marca de la unidad solo puede contener letras y espacios.",
            "string.min": "La marca de la unidad debe tener como mínimo 3 caracteres.",
            "string.max": "La marca de la unidad debe tener como máximo 50 caracteres.",
        }),
})
    .or(
        "numeroSerie",
        "nombreStock",
        "cantidadStock",
        "colorUnidad", 
        "precioUnidad", 
        "marcaUnidad"
    )
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing": "Debes proporcionar al menos un parámetro: numeroSerie, nombreStock, cantidadStock, colorUnidad, precioUnidad o marcaUnidad.",
    });

