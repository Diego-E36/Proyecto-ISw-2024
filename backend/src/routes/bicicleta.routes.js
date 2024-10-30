"use strict";
 import { Router } from "express";
 import {
    createBici,
    deleteBici,
    getAllBici,
    getBici,
    updateBici,
 } from "../controllers/bicicleta.controller.js";

 const router = Router();

 router
        .post("/", createBici)
        .get("/all", getAllBici)
        .get("/:id", getBici)
        .patch("/:id", updateBici)
        .delete("/:id", deleteBici);

 export default router;