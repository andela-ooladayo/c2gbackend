var _ = require('lodash');

module.exports =
  _.template(
    '<body>' +
      '<style type="text/css">' +
        '@import url(http://fonts.googleapis.com/css?family=Raleway);' +
      '</style>' +
      '<div style="' +
          'margin: 2%; width: 94%; font: 1.1em Raleway, Trebuchet Ms; line-height: 26px; ' + 
          'padding-bottom: 15px;">' +
        '<div style="height: 70px; text-align: center; padding: 22px;">' +
        '</div>' +
        '<div>' +
            '<h4>' + 
                'Hello,' +
            '</h4>' +
            '<p>' + "Thank you for signing up with FGSC vehicle license." + '</p>' +
            '<p>' + "Visit our site today by click this " + '<a href="http://ahhlife.com/">' + 'http://atlas.money/' + '</a>' + '</p>' +
        '</div>' +
      '</div>' +
    '</body>'
    );