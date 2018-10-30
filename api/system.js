const fs = require('fs');

const system = {
  writeFile({ name, data }) {
    return fs.writeFileSync(name, data);
  },
};

module.exports = system;