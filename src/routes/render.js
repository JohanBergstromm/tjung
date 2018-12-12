import express from 'express';
import { homeRedirectIfAuth, authRequired } from 'lib/auth';

const router = express.Router();

router.get('/', homeRedirectIfAuth, index);
router.get('/home', authRequired, home);
router.get('/register', homeRedirectIfAuth, register);

function index(req, res) {
  res.render('index');
}

function home(req, res) {
  res.render('home');
}

function register(req, res) {
  res.render('register');
}

export default router;
