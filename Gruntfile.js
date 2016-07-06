module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      scripts: {
        files: ['css/*.scss', 'js/*.js'],
        tasks: ['sass', 'uglify'],
        options: {
          spawn: false,
        },
      },
    },
    uglify: {
      build: {
        src: 'js/*.js',
        dest: 'build/js/script.min.js'
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'compressed'
        },
        files: {                         // Dictionary of files
          'build/css/style.min.css': 'css/style.scss'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'sass', 'watch']);

};