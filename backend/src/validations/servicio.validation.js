"use strict";

import Joi from "joi";

export const servicioQuerySchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
    id_bicicleta: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id de bicicleta debe ser un número.",
            "number.integer": "El id de bicicleta debe ser un número entero.",
            "number.positive": "El id de bicicleta debe ser un número positivo.",
        }),
    id_usuario: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id de usuario debe ser un número.",
            "number.integer": "El id de usuario debe ser un número entero.",
            "number.positive": "El id de usuario debe ser un número positivo.",
        }),
})
    .or("id", "id_bicicleta", "id_usuario")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing": "Debes proporcionar al menos un parámetro: id, id_bicicleta o id_usuario",
    });

export const servicioBodySchema = Joi.object({
    id_inventario: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id de inventario debe ser un número.",
            "number.integer": "El id de inventario debe ser un número entero.",
            "number.positive": "El id de inventario debe ser un número positivo.",
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
    estado: Joi.string()
        .min(5)
        .max(500)
        .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El estado no puede estar vacío.",
            "string.base": "El estado debe ser de tipo string.",
            "string.min": "El estado debe tener como mínimo 5 caracteres.",
            "string.max": "El estado debe tener como.maxcdn 500 caracteres.",
            "string.pattern.base": "El estado solo puede contener letras.",
        }),
    valor: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El valor debe ser un número.",
            "number.integer": "El valor debe ser un número entero.",
            "number.positive": "El valor debe ser un número positivo.",
        }),
    descripcion: Joi.string()
        .min(5)
        .max(500)
        .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "La descripción no puede estar vacía.",
            "string.base": "La descripción debe ser de tipo string.",
            "string.min": "La descripción debe tener como mínimo 5 caracteres.",
            "string.max": "La descripción debe tener como máximo 500 caracteres.",
            "string.pattern.base": "La descripción solo puede contener letras.",
        }),
    duracionMins: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "La duración en minutos debe ser un número.",
            "number.integer": "La duración en minutos debe ser un número entero.",
            "number.positive": "La duración en minutos debe ser un número positivo.",
        }),
})
    .or(
        "tipo",
        "estado",
        "valor",
        "descripcion",
        "duracionMins"
    )
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing": "Debes proporcionar al menos una propiedad: tipo, estado, valor, descripcion o duracionMins",
    });