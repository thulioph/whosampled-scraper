const sample = require('../api/sample');
const system = require('../api/system');

const _saveFile = ({ values }) => {
  system.writeFile({
    name: `files/${artistName}.json`,
    data: JSON.stringify(values),
  });
}

const _handleSuccess = (result) => {
  if (result && result.length > 0) {
    const info = result.map(({ sampleUrl }) => sample.getInfo(sampleUrl));
    Promise.all(info).then(values => _saveFile(values));
  }
}

const _handleError = (error) => {
  console.warn('Algo deu errado:', error);
}

const artist = process.argv[2] || null;
let artistName;

if (artist) {
  artistName = artist.toLowerCase().replace(' ', '-');

  const songs = sample.songs(artist);
  songs.then(_handleSuccess).catch(_handleError);
}