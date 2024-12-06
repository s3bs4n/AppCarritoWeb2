module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    reporters: ['progress', 'coverage'],
    browsers: ['Chrome'],
    singleRun: false,
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'lcovonly', subdir: '.' },
        { type: 'html', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  });
};
