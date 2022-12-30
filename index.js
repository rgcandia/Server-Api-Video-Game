//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn,Genre } = require('./src/db.js');
const {setTableGenres} =  require('./src/api_rawg/index.js');
require('dotenv').config();
const {API_URL_GENRE,API_KEY} =  process.env;
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
  setTableGenres(Genre,API_URL_GENRE,API_KEY)
  ;// Inicializa la tabla Genres.
  console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
