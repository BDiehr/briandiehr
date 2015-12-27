module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    concurrent: {
      dev: ["nodemon", "watch"],
      options: {
        logConcurrentOutput: true
      }
    },
    nodemon: {
      dev: {
        script: 'index.js',
        options: {
          env: {
            "NODE_ENV": "development",
            "NODE_CONFIG": "dev"
          },
          watch: ["src"],
          delay: 300,
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });
          }
        }
      }
    },
    eslint: {
      target: ['./src/**/*.js']
    },
    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify', {
              loose: 'all'
            }]
          ]
        },
        files: {
          './dist/module.js': ['./src/**/*.js']
        }
      }
    },
    watch: {
      scripts: {
        files: ['./src/**/*.js'],
        tasks: ['eslint', 'browserify']
      }
    }
  });


  grunt.registerTask('dev', ['concurrent']);
  grunt.registerTask('build', ['browserify']);
};
