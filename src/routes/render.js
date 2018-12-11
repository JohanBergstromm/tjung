import express from 'express';
import { homeRedirectIfAuth, authRequired } from 'lib/auth';

const router = express.Router();

router.get('/', homeRedirectIfAuth, index);
router.get('/home', authRequired, home);
router.get('/register', homeRedirectIfAuth, register);

function index(req, res) {
  res.send(
    '<!DOCTYPE html> <html> <head> <title>Login</title> </head> <body> <form action="/authenticate" method="post" class="form"> <div> <input type="email" name="email" placeholder="Email"> </div> <div> <input type="password" name="password" placeholder="Password"> </div> <div> <label for="remember-me" class="d-flex"> <input type="checkbox" id="remember-me" name="remember_me" /> Remember me </label> </div> <div> <button type="submit">Login</button> </div> <hr> <a href="/register">Register</a> </form> </body> </html>'
  );
}

function home(req, res) {
  res.send(
    '<!DOCTYPE html> <html> <head> <title>Home</title> </head> <body> <h1>Home</h1><div class="logout"><a href="/logout">Logout</a></div> </body> </html>'
  );
}

function register(req, res) {
  res.send(
    '<!DOCTYPE html> <html> <head> <title>Register</title> </head> <body> <h1>Register</h1> <form action="/register" method="post"> <input type="email" name="email" placeholder="Email..."> <input type="password" name="password" placeholder="Password..."> <input type="password" name="confirm_password" placeholder="Confirm password..."> <button type="submit">Submit</button> </form><hr><a href="/">Login</a> </body> </html>'
  );
}

export default router;
