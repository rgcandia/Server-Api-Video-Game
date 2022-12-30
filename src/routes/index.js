const { Router } = require('express');
const handler_home =  require('./handlers/handler_home.js');
const handler_get_videogames = require('./handlers/handler_get_videogames.js');
const handler_get_genres =  require('./handlers/handler_get_genres.js');
const handler_id_videogames = require('./handlers/handler_id_videogames.js');
const handler_post_videogames = require('./handlers/handler_post_videogames.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/',handler_home);
router.get('/videogames',handler_get_videogames);
router.get('/videogames/:id',handler_id_videogames);
router.post('/videogames',handler_post_videogames);
router.get('/genres',handler_get_genres);

module.exports = router;