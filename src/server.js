import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
import session from 'express-session';
import flash from 'connect-flash';

require('dotenv').config();
var morgan = require('morgan')



const app = express();
const port = process.env.PORT || 8080;// connect file env

app.use((req, res, next) => {
    //check => return res.send()
    console.log('>>> run into my middleware')
    console.log(req.method)
    next();
})

app.use(morgan('combined'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'user',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Sử dụng flash
app.use(flash());

// Cấu hình middleware để truyền flash messages vào response locals
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);

// init api route
initAPIRoute(app);


//handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

