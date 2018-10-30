const sample = require('../api/sample');
const system = require('../api/system');

const artist = process.argv[2] || null;

if (artist) {
  const artistName = artist.toLowerCase().replace(' ', '-');
  const songs = sample.songs(artist);

  songs.then(result => {
    if (result && result.length > 0) {
      const info = result.map(({ sampleUrl }) => sample.getInfo(sampleUrl));

      Promise.all(info).then(values => {
        system.writeFile({
          name: `${artistName}.json`,
          data: JSON.stringify(values),
        });
      });
    }
  }).catch(err => {
    console.warn('Algo deu errado:', err);
  });
}