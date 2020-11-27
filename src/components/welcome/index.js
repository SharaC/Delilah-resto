const router = require('express').Router();
const { 
    apiWelcome 
} = require('./controller');

router.get('/', apiWelcome);

module.exports = router;