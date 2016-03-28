module.exports = {
  npm: {
    styles: {'normalize.css': ['normalize.css']}
  },

  plugins: {
    babel: {presets: ['es2015', 'react']}
  },

  files: {
    javascripts: {joinTo: 'app.js'},
    stylesheets: {joinTo: 'app.css'}
  }
};
