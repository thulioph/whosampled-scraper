const request = require('./request');

const config = {
  API_URL: 'http://www.whosampled.com/search',
};

const sampleInfo = {
  metaData: {
    kind: '.section-header .section-header-title | trim'
  },
  dest: {
    name: '#sampleWrap_dest  .trackName | trim',
    artist: '#sampleWrap_dest .sampleTrackArtists | trim',
    release: '#sampleWrap_dest .release-name a',
    year: '#sampleWrap_dest .trackLabel span + span',
    label: '#sampleWrap_dest .trackLabel span',
    image: '#sampleWrap_dest .sampleTrackImage img@src',
    appearsAt: '.dest-timing',
    youtubeId: '.embed-dest iframe@src | parseYoutubeId'
  },
  source: {
    name: '#sampleWrap_source  .trackName | trim',
    artist: '#sampleWrap_source .sampleTrackArtists | trim',
    release: '#sampleWrap_source .release-name a',
    year: '#sampleWrap_source .trackLabel span + span',
    label: '#sampleWrap_source .trackLabel span',
    image: '#sampleWrap_source .sampleTrackImage img@src',
    appearsAt: '.source-timing',
    youtubeId: '.embed-source iframe@src | parseYoutubeId'
  }
};

const sample = {
  songs(query) {
    const { API_URL } = config;
    const url = `${API_URL}/connections/?q=${encodeURIComponent(query)}`;

    return new Promise((resolve, reject) => {
      request(url, {
        songs: request('li.listEntry', [{ sampleUrl: 'a@href' }])
      })((err, result) => {
        if (err) reject(err);
        resolve(result.songs);
      });
    });
  },

  getInfo(url) {
    return new Promise((resolve, reject) => {
      request(url, sampleInfo)((err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
};

module.exports = sample;