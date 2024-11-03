"use strict";

import Joi from "joi";

export const bicicletaQuerySchema = Joi.object({
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
        .case("upper")
        .pattern(/^[a-zA-Z0-9]+$/)
        .messages({
            "string.empty": "El número de serie no puede estar vacío.",
            "string.base": "El número de serie debe ser de tipo string.",
            "string.min": "El número de serie debe tener como mínimo 5 caracteres.",
            "string.max": "El número de serie debe tener como máximo 50 caracteres.",
            "string.pattern.base": "El número de serie solo puede contener letras y números.",
        }),
})
    /*.or("id", "numeroSerie")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing": "Debes proporcionar al menos un parámetro: id o número de serie",
    });*/

export const bicicletaBodySchema = Joi.object({
    numeroSerie: Joi.string()
        .min(5)
        .max(50)
        .case("upper")
        .pattern(/^[a-zA-Z0-9]+$/)
        .messages({
            "string.empty": "El número de serie no puede estar vacío.",
            "string.base": "El número de serie debe ser de tipo string.",
            "string.min": "El número de serie debe tener como mínimo 5 caracteres.",
            "string.max": "El número de serie debe tener como máximo 50 caracteres.",
            "string.pattern.base": "El número de serie solo puede contener letras y números.",
        }),
    marca: Joi.string()
        .min(5)
        .max(50)
        .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "La marca no puede estar vacía.",
            "string.base": "La marca debe ser de tipo string.",
            "string.min": "La marca debe tener como mínimo 5 caracteres.",
            "string.max": "La marca debe tener como máximo 50 caracteres.",
            "string.pattern.base": "La marca solo puede contener letras.",
        }),
    modelo: Joi.string()
        .min(3)
        .max(50)
        .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El modelo no puede estar vacío.",
            "string.base": "El modelo debe ser de tipo string.",
            "string.min": "El modelo debe tener como mínimo 5 caracteres.",
            "string.max": "El modelo debe tener como.maxcdn 50 caracteres.",
            "string.pattern.base": "El modelo solo puede contener letras.",
        }),
    color: Joi.string()
        .min(4)
        .max(20)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El color no puede estar vacío.",
            "string.base": "El color debe ser de tipo string.",
            "string.min": "El color debe tener como mínimo 5 caracteres.",
            "string.max": "El color debe tener como máximo 20 caracteres.",
            "string.pattern.base": "El color solo puede contener letras.",
        }),
    tipo: Joi.string()
        .min(5)
        .max(50)
        .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El tipo no puede estar vacío.",
            "string.base": "El tipo debe ser de tipo string.",
            "string.min": "El tipo debe tener como mínimo 5 caracteres.",
            "string.max": "El tipo debe tener como máximo 20 caracteres.",
            "string.pattern.base": "El tipo solo puede contener letras.",
        }),
    aro: Joi.number()
        .integer()
        .positive()
        .min(10)
        .max(40)
        .messages({
            "number.base": "El aro debe ser un número.",
            "number.min": "El aro debe ser como mínimo 10.",
            "number.max": "El aro debe ser como máximo 40.",
            "number.integer": "El aro debe ser un número entero.",
            "number.positive": "El aro debe ser un número positivo.",
        }),
    venta: Joi.boolean()
        .messages({
            "boolean.base": "La venta debe ser de tipo booleano.",
        })
})
    .or(
        "numeroSerie",
        "marca",
        "modelo",
        "color",
        "tipo",
        "aro"
    )
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing": "Debes proporcionar los parámetro: marca, modelo, color, tipo, aro y venta"
    });