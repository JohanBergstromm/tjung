import express from 'express';
import { homeRedirectIfAuth, authRequired } from 'lib/auth';
import User from 'models/User';

const router = express.Router();

router.get('/', homeRedirectIfAuth, index);
router.get('/home', authRequired, home);
router.get('/register', register);

function index(req, res) {
    res.render('index');
}

async function home(req, res) {
    res.render('home');
}

function register(req, res) {
    res.render('register');
}

export default router;