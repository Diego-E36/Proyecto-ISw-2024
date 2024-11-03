"use strict";
import Joi from "joi";

export const materialesQueryValidation = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
    materialId: Joi.string()
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

export const materialesBodyValidation = Joi.object({
    materialId: Joi.string()
        .min(5)
        .max(50)
        .pattern(/^[a-zA-Z0-9]+$/)
        .uppercase()
        .messages({
            "string.pattern.base": "El número de serie solo puede contener letras, números y espacios.",
            "string.min": "El número de serie debe tener como mínimo 5 caracteres.",
            "string.max": "El número de serie debe tener como máximo 50 caracteres.",
    }),
    name: Joi.string()
        .min(5)
        .max(255)
        .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.pattern.base": "El nombre solo puede contener letras, números y espacios.",
            "string.min": "El nombre debe tener como mínimo 5 caracteres.",
            "string.max": "El nombre debe tener como máximo 255 caracteres.",
        }),
    quantity: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "La cantidad de stock debe ser un número.",
            "number.integer": "La cantidad de stock debe ser un número entero.",
            "number.positive": "La cantidad de stock debe ser un número positivo.",
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
        .min(5)
        .max(255)
        .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.pattern.base": "El nombre solo puede contener letras, números y espacios.",
            "string.min": "El nombre debe tener como mínimo 5 caracteres.",
            "string.max": "El nombre debe tener como máximo 255 caracteres.",
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
})

    .or(
        "materialId",
        "name",
        "quatity",
        "minQuantity",
        "supplier",
        "suggestedRedstock"
    )

    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing": "Debes proporcionar al menos un parámetro: materialId, name, quatity, minQuantity, supplier, suggestedRedstock",
    });