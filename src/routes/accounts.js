import express from 'express';
import User from 'models/User';
import { homeRedirectIfAuth, authRequired } from 'lib/auth';

const router = express.Router();

router.get('/accounts', authRequired, accounts);

function accounts(req, res) {
    User.find(function(err, users) {
        res.render('accounts', {
            users
        });
    });
}

router.post('/users/:id', async function(req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(400).send('Not found');
    }

    await user.remove();

    if (req.session.userId === req.params.id || req.cookies.userId === req.params.id) {
        if (req.cookies.userId) {
            res.clearCookie('userId');
        }
        req.session.destroy(err => (err ? next(err) : res.json({redirect: true})));
    } else {
        res.send('User removed')
    }

    
});

export default router;