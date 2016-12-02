// tests.webpack.js
var context = require.context('./api-ui/tests', true, /-test\.jsx$/);
context.keys().forEach(context);
