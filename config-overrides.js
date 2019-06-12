const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  // do stuff with the webpack config...
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "rgb(35, 85, 194)",
      // '@font-size-base': '16px',
      // "@secondary-color": "#857c6a",
      // "@secondary-color-pale": "#bdb3a6",
      // "@mobile-side-padding": "20px",
      // "@border-radius-base": "0px",
      // "@btn-default-bg": "#5c5c5c",
      // "@btn-default-bg-hover": "#696969",
      '@layout-body-background': 'transparent',
      // '@text-color': '#000000',
      // '@font-family': '\'Noto Sans KR\', sans-serif;',

      // '@btn-height-base': '34px',
      // '@btn-height-lg': '44px',
      // '@border-radius-base': '22px',
      // '@xs-min': '~\'all and (min-width: 576px)\'',
      // '@xs-max': '~\'all and (max-width: 575px)\'',
      // '@sm-min': '~\'all and (min-width: 768px)\'',
      // '@sm-max': '~\'all and (max-width: 767px)\'',
      // '@md-min': '~\'all and (min-width: 992px)\'',
      // '@md-max': '~\'all and (max-width: 991px)\'',
      // '@lg-min': '~\'all and (min-width: 1200px)\'',
      // '@lg-max': '~\'all and (max-width: 1199px)\'',
      // '@xl-min': '~\'all and (min-width: 1600px)\'',
      // '@xl-max': '~\'all and (max-width: 1599px)\''
    }
  })
);
