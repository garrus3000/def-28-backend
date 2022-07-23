import { Router } from "express";

const routesHBS = Router();


const getRoot = (req, res) => {
    if (req.session.passport !== undefined)  res.redirect("/home");
    else res.redirect("/signup");
};

const getHome = (req, res) => {
    const user = req.session.passport;
    if (user !== undefined) res.render("index", { title: "Productos y Mensajes", user: req.session.passport.user });
    else res.redirect("/login");
};

const getSignup = (req, res) => {
    if (req.session.passport !== undefined) res.redirect("/home");
    else res.render("signup", { title: "Signup" });
};


const getLogin = (req, res) => {
    if (req.session.passport !== undefined) res.redirect("/home");
    res.render("login", { title: "Login" });
};

const postLogin = (req, res) => {
    res.redirect("/home");
};

export default { routesHBS, getRoot, getSignup, getLogin, postLogin, getHome };

// const isLoggedIn = (req, res, next) => {
//     if (req.session.passport !== undefined) return next();
//     res.redirect("/signup");
// };


// routesHBS.get("/", (req, res) => {
//     const user = req.session.passport;
//     if (user !== undefined) {
//         res.redirect("/home");
//     }
//     res.render('signup', { title: 'Signup' });
// });

// // ROOT - HOME
// app.get('/', routerLogin.getRoot);
// app.get('/home', routerLogin.getHome)

// //  SIGNUP
// app.
//     route("/signup")
//         .get(routerLogin.getSignup)
//         .post(passport.authenticate("signup", {successRedirect:"/login", failureRedirect:"/failsignup"}));
// ;    
// app.get('/failsignup', routerLogin.getFailSignup);


// //  LOGIN
// app.
//     route("/login")
//         .get(routerLogin.getLogin)
//         .post(passport.authenticate("login", {successRedirect:"/home", failureRedirect:"/faillogin"}), routerLogin.postLogin);
// ;
// app.get('/faillogin', routerLogin.getFailLogin);


// // LOGOUT 
// app.get('/user', routerLogin.getUser); // extraer Session user
// app.get("/logout", routerLogin.getLogout);
// app.get('/crl', routerLogin.getCrl);





