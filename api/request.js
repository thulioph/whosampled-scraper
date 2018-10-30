const Xray = require('x-ray');

const request = Xray({
  filters: {
    trim: (value) => {
      return typeof value === 'string' ? value.trim() : value;
    },

    parseYoutubeId: (value) => {
      if (value && typeof value === 'string') {
        if (value.match(/youtube/)) {
          return value
            .split('embed/')[1]
            .split('?')[0];
        }
      }
      return false;
    },

    parseTime: (value) => {
      if (value && typeof value === 'string') {
        return value
          .split('at')[1]
          .split('(and')[0]
          .trim();
      }
      return false;
    }
  }
});

module.exports = request;