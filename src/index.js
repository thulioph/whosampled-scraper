const sample = require('../api/sample');
const system = require('../api/system');
const cli = require('../api/cli');

const _saveFile = (values) => {
  system.writeFile({
    name: `files/${artistName}.json`,
    data: JSON.stringify(values),
  });
}

const _handleSuccess = (result) => {
  if (result && result.length > 0) {
    const info = result.map(({ sampleUrl }) => sample.getInfo(sampleUrl));
    return Promise.all(info).then(values => _saveFile(values));
  }
}

const _handleError = (error) => {
  console.warn('Algo deu errado:', error);
}

let artistName;

cli.start().then((artist) => {
  artistName = artist.toLowerCase().replace(' ', '-');
  sample.songs(artist).then(_handleSuccess).catch(_handleError);
}).catch((err) => {
  console.warn('Err =>', err);
});