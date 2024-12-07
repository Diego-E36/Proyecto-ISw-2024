"use strict";

import Joi from "joi";

export const provQueryValidation = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
    rut: Joi.string()
    .min(9)
    .max(12)
    .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base": "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    })
})

export const provBodyValidation = Joi.object({
    rut: Joi.string()
    .min(9)
    .max(12)
    .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base": "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),
    nombre: Joi.string()
    .max(50)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
        "string.empty": "El nombre no puede estar vacío.",
        "string.base": "El nombre debe ser de tipo string.",
        "string.max": "El nombre debe tener como máximo 50 caracteres.",
        "string.pattern.base": "El nombre solo puede contener letras.",
    }),
    email: Joi.string()
    .max(50)
    .email()
    .messages({
        "string.empty": "El email no puede estar vacío.",
        "string.base": "El email debe ser de tipo string.",
        "string.max": "El email debe tener como máximo 50 caracteres.",
        "string.email": "El email debe ser un email válido.",
    }),
    telefono: Joi.string()
    .min(9)
    .max(12)
    .pattern(/^[+]?[0-9]+$/)
    .messages({
        "string.empty": "El telefono no puede estar vacío.",
        "string.base": "El telefono debe ser de tipo string.",
        "string.min": "El telefono debe tener como mínimo 9 caracteres.",
        "string.max": "El telefono debe tener como máximo 12 caracteres.",
        "string.pattern.base": "El telefono solo puede contener números y el símbolo +.",
    }),
})
.or(
    "rut",
    "nombre",
    "email",
    "telefono"
)
.unknown(true)
.messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos un campo: rut, nombre, email o telefono.",
});