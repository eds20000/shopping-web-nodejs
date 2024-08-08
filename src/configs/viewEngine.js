import express from "express";
import path from 'path';

const configViewEngine = (app) => {
    app.use(express.static(path.join(__dirname, '../public')));

    // Cấu hình view engine
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));
}

export default configViewEngine;
