const fs = require('fs').promises;

fs.cp('data/resources', 'public/resources', {
  recursive: true,
});
