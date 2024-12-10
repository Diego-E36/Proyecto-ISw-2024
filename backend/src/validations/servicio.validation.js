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
})

export const servicioBodySchema = Joi.object({
    bicicleta: Joi.string()
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
    item: Joi.string()
        .min(5)
        .max(50)
        .pattern(/^[a-zA-Z0-9]+$/)
        .uppercase()
        .messages({
            "string.pattern.base": "El número de serie solo puede contener letras, números y espacios.",
            "string.min": "El número de serie debe tener como mínimo 5 caracteres.",
            "string.max": "El número de serie debe tener como máximo 50 caracteres.",
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
        .valid("Espera", "Reparación", "Finalizado")
        .messages({
            "any.only": "El estado debe ser uno de los siguientes: Espera, Reparacion, Finalizado.",
            "string.empty": "El estado no puede estar vacío.",
            "string.base": "El estado debe ser de tipo string.",
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
        "bicicleta",
        "item",
        "rut",
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