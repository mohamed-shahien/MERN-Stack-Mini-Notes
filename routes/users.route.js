import express from 'express';


const router = express.Router();

router.route('/login')
        .post((req, res) => {
                res.send('Login route');
        });
router.route('/register')
        .post((req, res) => {
                res.send('Register route');
        });
