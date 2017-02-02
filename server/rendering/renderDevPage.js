const renderTemplate = require('./renderTemplate');
const globals = require('../globals');

module.exports = function renderDevPage() {
  console.log("rendering dev page");
  renderTemplate(
    [
      globals.defaultLink, globals.defaultLink, globals.defaultLink,
      globals.defaultLink, globals.defaultLink, globals.defaultLink
    ],
    'all',
    'dev.html',
    globals.renderedCategoriesDir,
    'Dev'
  )
  .then(() => console.log('Rendered dev page'))
}
