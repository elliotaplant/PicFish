const environment = require('./config/environment');

const globals = {
  categories: {
    'funny': [ 'funny', 'BlackPeopleTwitter', 'memes' ],
    'cute': [ 'aww', 'wholesomegifs' ],
    'general': [ 'pics' ],
    'gifs': [ 'gifs' ],
    'gaming': [ 'gaming' ],
    'earth': [ 'earthPorn' ]
  },
  defaultLink: {
    text: 'Uh oh! We couldn\'t find the picture you were looking for. We\'ll try to fix it on our end :)',
    href: 'http://imgur.com/PbcZq8t.jpg',
    linkId: 47378
  },
  defaultFilename: __dirname + '/fileCache/renderedSharedLinks/defaultLink.html',
  linkRefreshInterval: '30 * * * *', // hourly on the **:30
  fileCleanupInterval: '1 0 * * * *', // daily at 12:01am
  renderedCategoriesDir: __dirname + '/fileCache/renderedCategories/',
  renderedSharedLinksDir: __dirname + '/fileCache/renderedSharedLinks/',
  stylesheetDir: __dirname + '/style.css',
  staticFileDir: __dirname + '/static',
  maxFbThumbnailBytes: 8000000, // < 8 MB
  maxTwThumbnailBytes: 100000000, // < 100 MB (no limit on twitpics)
  defaultThumbnailUrl: 'http://www.pic.fish/logo.png',
  maxValidationRequestTime: 20000, // 10 s
}

if (environment.mode === 'dev' && process.argv.indexOf('short') > -1) {
  globals.categories = { 'general': [ 'pics' ] };
}

module.exports = globals;
