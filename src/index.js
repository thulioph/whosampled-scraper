let dale = require('../api/sample');

let callback = function(ds) {
  console.warn('callback', ds.body.tracks);
}

// dale.get('Wu-Tang-Clan', callback);
dale.get(process.argv[2], callback);
