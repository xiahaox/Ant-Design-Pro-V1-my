const path = require('path');
export default {
  "entry": "src/index.js",
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ],
   "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    }
  },
  alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  
}