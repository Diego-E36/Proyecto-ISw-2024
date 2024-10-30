"use strict";
import Joi from "joi";

export const materialesQueryValidation = Joi.object({
    id: Joi.number()
        .integer()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
})

export const materialesBodyValidation = Joi.object({
    id: Joi.number()
    .integer()
    .positive()
    .messages({
        "number.base": "El id debe ser un número.",
        "number.integer": "El id debe ser un número entero.",
        "number.positive": "El id debe ser un número positivo."
    }),

    name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
        "string.base": "El nombre debe ser un texto.",
        "string.empty": "El nombre no puede estar vacío.",
        "string.min": "El nombre debe tener al menos 3 caracteres.",
        "string.max": "El nombre debe tener como máximo 100 caracteres.",
        "any.required": "El nombre es obligatorio."
    }),

    quantity: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
        "number.base": "La cantidad debe ser un número.",
        "number.integer": "La cantidad debe ser un número entero.",
        "number.min": "La cantidad no puede ser negativa.",
        "any.required": "La cantidad es obligatoria."
    }),

    minQuantity: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
        "number.base": "La cantidad mínima debe ser un número.",
        "number.integer": "La cantidad mínima debe ser un número entero.",
        "number.min": "La cantidad mínima no puede ser negativa.",
        "any.required": "La cantidad mínima es obligatoria."
    }),

    supplier: Joi.string()
    .allow(null, " ")
    .max(100)
    .optional()
    .messages({
        "string.base": "El proveedor debe ser un texto.",
        "string.max": "El proveedor debe tener como máximo 100 caracteres."
    }),

    suggestedRestock: Joi.number()
    .integer()
    .min(0)
    .default(10)
    .messages({
        "number.base": "El restock sugerido debe ser un número.",
        "number.integer": "El restock sugerido debe ser un número entero.",
        "number.min": "El restock sugerido no puede ser negativo."
    }),
});