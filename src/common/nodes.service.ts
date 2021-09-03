export class Nodes {
  static baseEntry() {
    return [
      {
        link: 'a@href',
        title: '.connectionTitle a',
        image: 'img@src',
      },
    ];
  }

  static detailedEntry() {
    return {
      metaData: {
        kind: '.section-header .section-header-title',
      },
      dest: {
        name: '#sampleWrap_dest  .trackName',
        artist: '#sampleWrap_dest .sampleTrackArtists | trim',
        release: '#sampleWrap_dest .release-name a',
        year: '#sampleWrap_dest .trackLabel a',
        image: '#sampleWrap_dest .sampleTrackImage img@src',
        label: '#sampleWrap_dest .trackLabel span',
        appearsAt: '.dest-timing',
        youtubeId: '.embed-dest .youtube-placeholder@data-id',
      },
      source: {
        name: '#sampleWrap_source  .trackName',
        artist: '#sampleWrap_source .sampleTrackArtists | trim',
        release: '#sampleWrap_source .release-name a',
        year: '#sampleWrap_source .trackLabel a',
        label: '#sampleWrap_source .trackLabel span',
        image: '#sampleWrap_source .sampleTrackImage img@src',
        appearsAt: '.source-timing',
        youtubeId: '.embed-source .youtube-placeholder@data-id',
      },
    };
  }
}
