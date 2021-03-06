import express from 'express';
import debug from 'debug';
import User from 'models/User';

const router = express.Router();
const log = debug('routes:register');
const Joi = require('joi');

const schema = Joi.object()
    .keys({
        email: Joi.string().email(),
        password: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*]{6,30}$/),
        confirm_password: Joi.any()
            .valid(Joi.ref('password'))
            .options({
                language: {
                    any: {
                        allowOnly: 'must match password',
                    },
                },
            })
            .required(),
        first_name: Joi.string(),
        last_name: Joi.string(),
        permission: Joi.object({
            admin: Joi.boolean(),
            user: Joi.boolean(),
            mom: Joi.boolean(),
            ryberg: Joi.boolean(),
            demo: Joi.boolean(),
        })
    })
    .required();

router.post('/register', register);

async function register(req, res) {
    log(`${req.method} ${req.originalUrl}`);

    console.log(req.body, req.url, req.originalUrl)

    const result = Joi.validate(req.body, schema);

    if (result.error !== null) {
        return res.status(500).send(result.error.message);
    }

    try {
        const user = await User.create(req.body);
        // Set registered user as current logged in user
        // req.session.userId = user._id;

        res.json(user);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export default router;