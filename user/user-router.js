const router = require('express').Router();
const User = require('./user-model.js');
const bcrypt = require('bcryptjs');

router.get('/getDb', (req, res) => {
    User
    .find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ error: 'Database could not be found...'})
    })
})

router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 5);
    user.password = hash;
    User
    .add(user)
    .then(good => {
        res.status(200).json({good, user});
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

router.post('/login', (req,res) => {
    let { username, password } = req.body;
        User
        .findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({ message: `You are logged in, ${user.username}` });
            } else {
                res.status(401).json({ message: 'You shall not pass!' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
})

router.get('/users', authenticate, (req, res) => {
    User
    .find()
    .then(users => {
        res.json(users);
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

router.get('/restricted/users', authenticate, (req, res) => {
    User
    .find()
    .then(users => {
        res.json(users);
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                res.status(500).json({ error: 'Unable to log out!' })
            } else {
                res.status(200).json({ message: 'You are logged out!' })
            }
        })
    } else {
        res.status(200).json({ message: 'You are logged out!' })
    }
})

// --------------------------- Middleware -------------------------------------------

function authenticate (req, res, next) {
    try {
        if(req && req.session && req.session.user) {
            next();
        } else {
            res.status(401).json({ errorMessage: 'Your credentials are invalid'})
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to authenticate'})
    }
}


module.exports = router;