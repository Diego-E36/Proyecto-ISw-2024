"use strict";
import joi from "joi";

export const provQueryValidation = joi.object({
    id: joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
    rutProveedor: joi.string()
        .max(10)
        .pattern(/^[0-9]+[-]{1}[0-9kK]{1}$/)
        .messages({
            "string.pattern.base": "El RUT debe tener un formato válido.",
            "string.max": "El RUT debe tener como máximo 10 caracteres.",
        }),
});

export const provBodyValidation = joi.object({
    rutProveedor: joi.string()
        .max(10)
        .pattern(/^[0-9]+[-]{1}[0-9kK]{1}$/)
        .messages({
            "string.pattern.base": "El RUT debe tener un formato válido.",
            "string.max": "El RUT debe tener como máximo 10 caracteres.",
        }),
    nombreProveedor: joi.string()
        .min(5)
        .max(50)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.pattern.base": "El nombre del proveedor solo puede contener letras y espacios.",
            "string.min": "El nombre del proveedor debe tener como mínimo 5 caracteres.",
            "string.max": "El nombre del proveedor debe tener como máximo 50 caracteres.",
        }),
    emailProveedor: joi.string()
        .min(15)
        .max(35)
        .email()
        .messages({
            "string.empty": "El correo electrónico no puede estar vacío.",
            "string.base": "El correo electrónico debe ser de tipo string.",
            "string.email": "El correo electrónico debe finalizar en @gmail.cl.",
            "string.min":
            "El correo electrónico debe tener como mínimo 15 caracteres.",
            "string.max":
            "El correo electrónico debe tener como máximo 35 caracteres.",
    }),
    telefonoProveedor: joi.string()
        .min(9)
        .max(12)
        .pattern(/^[0-9]+$/)
        .messages({
            "string.pattern.base": "El teléfono solo puede contener números.",
            "string.min": "El teléfono debe tener como mínimo 9 caracteres.",
            "string.max": "El teléfono debe tener como máximo 12 caracteres.",
        }),
})
    .or(
        "rutProveedor",
        "nombreProveedor",
        "emailProveedor",
        "telefonoProveedor"
    )
    .unknown(false)
    .messages({
        "object.unknown": "El objeto contiene campos no permitidos.",
    });