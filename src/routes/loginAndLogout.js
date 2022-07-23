import { error } from "console";
import { Router } from "express";
import path from "path";
import { fileURLToPath } from 'url';



const routerLogin = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const signup_html = path.join(__dirname, '../../public/pages/signup.html');
const login_html = path.join(__dirname, '../../public/pages/login.html');
const index_html = path.join(__dirname, '../../public/pages/index.html');
const logout_html = path.join(__dirname, '../../public/pages/logout.html');
const faillogin_html = path.join(__dirname, '../../public/pages/faillogin.html');
const failsignup_html = path.join(__dirname, '../../public/pages/failsignup.html');


const getRoot = (req, res) => {
    if(!req.session.passport !== undefined) return res.redirect("/home");
    else return res.redirect('/signup');
};

const getHome = ( req, res) => {
    const user = req.session.passport;
    if(user !== undefined) return res.sendFile(path.join(index_html));
    // if(user === undefined) return res.redirect("/login");
    else return res.redirect("/signup");
};

const getSignup = (req, res) => {
    res.sendFile(path.join(signup_html));
};

const getFailLogin = (req, res) => {
    res.sendFile(path.join(faillogin_html));
};

const getFailSignup = (req, res) => {
    res.sendFile(path.join(failsignup_html));
};

const getLogin = (req, res) => {
    res.sendFile(path.join(login_html));
};

const postLogin = (req, res) => {
    const user = req.user;
    res.redirect("/home");
};

const getUser = (req, res) => {
    const user = req.session.passport;
    if(user !== undefined) return res.send(req.session.passport.user);
    // if (user === undefined) return res.send(null);
    else res.redirect("/login");
};

const getLogout = (req, res) => {
    const user = req.session.passport;
    if(user !== undefined) res.sendFile(path.join(logout_html))
    else res.redirect("/");
};

const getCrl = (req, res) => {
    req.session.destroy();
    res.redirect("/login");
};

export default {
    routerLogin,
    getRoot,
    getSignup,
    getHome,
    getFailLogin,
    getFailSignup,
    getLogin,
    postLogin,
    getUser,
    getLogout,
    getCrl
};