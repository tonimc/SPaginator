module.exports = function(grunt) {
	// Do grunt-related things in here
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		qunit: {
			files: ['tests/*.html']
		},
		jshint: {
			files: ['paginator.js', 'tests/tests.js']
		}
	});
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default', ['qunit', 'jshint']);
};