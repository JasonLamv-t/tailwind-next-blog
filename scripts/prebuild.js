const fs = require('fs').promises;
const path = require('path');

fs.cp('data/resources', 'public/resources', {
  recursive: true,
});
