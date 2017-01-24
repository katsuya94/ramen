module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.initConfig({
    connect: {
      server: {
        options: {
          base: 'dist'
        }
      }
    },
    jscs: {
      src: ['Gruntfile.js', 'js/**/*.js', 'spec/**/*.js'],
      options: {
        force: true,
        preset: 'google'
      }
    },
    jshint: {
      src: ['Gruntfile.js', 'js/**/*.js', 'spec/**/*.js'],
      options: {
        force: true,
        expr: true
      }
    },
    clean: ['dist'],
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'html/', src: '**.html', dest: 'dist/'},
          {expand: true, cwd: 'js/', src: '**.js', dest: 'dist/js/'},
          {
            expand: true,
            cwd: 'bower_components/phaser/build/',
            src: 'phaser.min.js',
            dest: 'dist/js'
          },
          {
            expand: true,
            cwd: 'bower_components/requirejs/',
            src: 'require.js',
            dest: 'dist/js'
          }
        ]
      }
    },
    watch: {
      scripts: {
        files: ['html/*.html', 'js/*.js'],
        tasks: ['build'],
        options: {
          interrupt: true,
          atBegin: true
        }
      }
    },
    mochaTest: {
      test: {
        src: ['spec/**/*.js']
      }
    }
  });
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('serve', ['connect:server:keepalive']);
  grunt.registerTask('build', [
    'jshint',
    'jscs',
    'clean',
    'copy'
  ]);
  grunt.registerTask('spec', ['jshint', 'jscs', 'mochaTest']);
};

