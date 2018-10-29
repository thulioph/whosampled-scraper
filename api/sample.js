"use strict";
const fs = require('fs');
const Xray = require("x-ray");

const x = Xray({
  filters: {
    trim: value => {
      return typeof value === "string" ? value.trim() : value;
    },
    parseYoutubeId: value => {
      if (value && typeof value === "string") {
        if (value.match(/youtube/)) {
          return value.split("embed/")[1].split("?")[0];
        }
      }
      return false;
    },
    parseTime: value => {
      console.log(value);
      if (value && typeof value === "string") {
        return value
          .split("at")[1]
          .split("(and")[0]
          .trim();
      }
      return false;
    }
  }
});

module.exports.get = (query, callback) => {
  var _sample = function(url) {
    return new Promise((resolve, reject) => {
      x(url, {
        metaData: {
          kind: ".section-header .section-header-title | trim"
        },
        dest: {
          name: "#sampleWrap_dest  .trackName | trim",
          artist: "#sampleWrap_dest .sampleTrackArtists | trim",
          release: "#sampleWrap_dest .release-name a",
          year: "#sampleWrap_dest .trackLabel span + span",
          label: "#sampleWrap_dest .trackLabel span",
          image: "#sampleWrap_dest .sampleTrackImage img@src",
          appearsAt: ".dest-timing",
          youtubeId: ".embed-dest iframe@src | parseYoutubeId"
        },
        source: {
          name: "#sampleWrap_source  .trackName | trim",
          artist: "#sampleWrap_source .sampleTrackArtists | trim",
          release: "#sampleWrap_source .release-name a",
          year: "#sampleWrap_source .trackLabel span + span",
          label: "#sampleWrap_source .trackLabel span",
          image: "#sampleWrap_source .sampleTrackImage img@src",
          appearsAt: ".source-timing",
          youtubeId: ".embed-source iframe@src | parseYoutubeId"
        }
      })((err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  };

  var samples = function() {
    return new Promise((resolve, reject) => {
      // var q;
      // if (
      //   event &&
      //   event.queryStringParameters &&
      //   event.queryStringParameters.q
      // ) {
      //   var q = encodeURIComponent(event.queryStringParameters.q);
      // }

      /* var q = encodeURIComponent("gold digger");
       * var q = ""
       * */
      // if (q && q.length > 0) {
        var connectionsUrl =
          "http://www.whosampled.com/search/connections/?q=" + encodeURIComponent(query);

        x(connectionsUrl, {
          songs: x("li.listEntry", [{ sampleUrl: "a@href" }])
        })((err, result) => {
          if (err) {
            reject(err);
            return;
          }

          // result.songs = result.songs.slice(0, 1);

          const samples = result.songs.map(item => {
            return _sample(item.sampleUrl);
          });

          resolve(
            Promise.all(samples).then(values => {
              return values;
            })
          );
        });
      // } 
      // else {
      //   resolve([]);
      // }
    });
  };

  samples().then(function(data) {
    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tracks: data
      })
    };

    fs.writeFileSync('samples.json', JSON.stringify(response));

    callback(response);
  });
};
