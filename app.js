// express web app instance
const express = require('express')

// parse request body to json
const body_parser = require('body-parser')

// for File IO
const path = require('path')

// make mock database (raw .json file) available globally in app
global.mock_db = path.join(__dirname, './data/mock_db.json');

const web_route = require('./routes/web/home')
const api_route = require('./routes/api');

const app = express();






const i18n = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

i18n
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'fr',
    backend: {
      loadPath: './locales/{{lng}}/translation.json',
    },
    detection: {
      order: ['cookie', 'header', 'querystring'], // Prioritize cookie
      caches: ['cookie'], // Cache language in cookies
      lookupCookie: 'preferredLanguage', // Specify your cookie name
    }
  }, () => {
    const port = 3000;
    app.listen(port, () => console.log(i18n.t('server.server_running') + ` ${port}`));
  });

// Set the view engine for web routes
app.set('view engine', 'pug');

app.use(middleware.handle(i18n));

app.use('/css', express.static('public/css'))
app.use('/js', express.static('public/js'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));






app.use('/api', api_route); // API routes
app.use('/', web_route); // web routes

// redirect to home page if unknown requests requested
app.use((req, res) => {
    res.redirect('/');
});
