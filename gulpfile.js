/*
jslint
    devel: true, maxerr: 10
*/

/*
global
    required:true
*/

/*
 *  Gulpfile
 *  @author Israel.
 */
(function () {
    'use strict';

    var gulp = require('gulp');
    var clean = require('gulp-clean');
    var concat = require('gulp-concat');
    var uglyfly = require('gulp-uglyfly');
    var cssmin = require('gulp-cssmin');
    var sass = require('gulp-sass');
    var config = require('./gulp.config.json');
    var del = require('del');
    var bower = require('gulp-bower');
    var bowerFiles = require('bower-files');
    var bowerConfig = require('bower-config');
    var print = require('gulp-print');
    var _ = require('underscore');
    var flatten = require('gulp-flatten');
    var sourcemaps = require('gulp-sourcemaps');
    var moment = require('moment');
    var sequence = require('gulp-sequence');
    var connect = require('gulp-connect');
    var inject = require('gulp-inject');
    
    var argv = require('yargs')
        // Explicando como usar o script gulpfile.
        .usage('Usage: $0 --env=<environment name> [-m=<mode name>]')
        // Definindo a opção 'env'.
        .option('env', {
            alias: 'environment',
            describe: 'Indicates the environment to build project for.',
            nargs: 1,
            demand: true,
            choices: ['local_dev', 'dev', 'qa', 'hom', 'prod']
        })
        // Definindo a opção 'm'.
        .option('m', {
            alias: 'mode',
            describe: 'Indicates the mode to be used.',
            choices: ['none', 'info', 'debug'],
            default: 'none',
            demand: false
        })
        .help() // Habilitando a opção 'help'.
        .argv;


    /**
     * @function generateExcludePath
     * @description Generates the paths to be excluded in a glob expression.
     * @param paths Array of paths must be ignored in glob expression.
     * @since 1.0.0
     * @version 1.0.0
     * @see _#map
     */
    function generateExcludePath(paths) {
        return _.map(paths, function(element) { return element.indexOf('!') == 1 ? element : '!' + element; });
    }

    /**
     * @function addTimeToConsoleArguments
     * @description Adds the current time, in 'HH:mm:ss' format, to argments to be writen in default output of the console.
     * @param args the array of paths.
     * @since 1.0.0
     * @version 1.0.0
     * @see console#info
     * @see console#warn
     * @see console#error
     * @see console#log
     * @see moment#format
     */
    function addTimeToConsoleArguments(args) {
        return _.union(['[%s] ' + args[0], moment().format('HH:mm:ss')], _.rest(args));
    }

    /**
     * @function info
     * @description Prints at console.info the message, with indicated parameters, and if info or debug mode is actived.
     * @param the same as console.log method parameters.
     * @since 1.0.0
     * @version 1.0.0
     * @see console#log
     */
    function info() {
        if (argv.mode === 'info') {
            var infoArgs = addTimeToConsoleArguments(arguments);
            console.info.apply(console, infoArgs);
        }
    }

    /**
     * @function debug
     * @description Prints at console.info the message, with indicated parameters, and if info or debug mode is actived.
     * @param the same as console.info method parameters.
     * @since 1.0.0
     * @version 1.0.0
     * @see console#info
     */
    function debug() {
        if (argv.mode === 'info' || argv.mode === 'debug') {
            var debugArgs = addTimeToConsoleArguments(arguments);
            console.info.apply(console, debugArgs);
        }
    }

    /**
     * @function watchInfo
     * @description Prints at console.info the message about the changing watched.
     * @since 1.0.0
     * @version 1.0.0
     */
    function watchInfo(event) {
        info('File %s was %s.', event.path, event.type);
    }

    gulp.task('default',['copy'], function(){
        gulp.start('sass');
    });

    gulp.task('copy',['clean'], function(){
        //return gulp.src('assets/**/*').pipe(gulp.dest('dist'));
        return gulp.src('src/js/*.js').pipe(gulp.dest('dist'));
    });

    gulp.task('clean', function(){
        return gulp.src('dist').pipe(clean());
    });


    gulp.task('sass', function(){
        gulp.src('src/sass/estilo.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'));
    });


    /**
     * @task clean:build
     * @description Clears the directory where the generated artifacts are placed.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see del
     */
    gulp.task('clean:build', function() {
        info('The artifacts to be removed are: ', config.paths.build.base, '.');
        return del(config.paths.build.base);
    });

    /**
     * @task app
     * @description Processes all artifacts of the application and copy it to build folder.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     */
    gulp.task('app', function(callback) {
        return sequence(['app:js', 'app:css', 'app:css:sass',
         'app:font', 'app:image'], 'app:html', callback);
    });

    /**
     * @task app:css
     * @description Processes the SASS files and copy them to the executing application folder.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see gulp#src
     * @see gulp#dest
     */
    gulp.task('app:css', function() {
        var paths = _.union(config.paths.source.css.includes, generateExcludePath(config.paths.source.css.excludes));
        info('The artifacts to be used are in: ', paths, '.');
        info('The artifacts will be generated in: %s.', config.paths.build.css);

        var sourceStream = gulp.src(paths);
        if (argv.mode === 'debug') {
            debug('The files to be processed by this task are:');
            sourceStream.pipe(print());
        }

        return sourceStream.pipe(gulp.dest(config.paths.build.css));
    });

    /**
     * @task app:css:sass
     * @description Generates the CSS file of the application from the SASS definitions.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     */
    gulp.task('app:css:sass', function() {
        var paths = _.union(config.paths.source.sass.includes, generateExcludePath(config.paths.source.sass.excludes));

        var sassOptions = {};
        if (argv.environment !== 'prod') {
            sassOptions = _.extend(sassOptions, {/*indentedSyntax: true,*/
                outputStyle: 'expanded',
                sourceComments: true,
                sourceMap: config.paths.build.css,
                sourceMapContents: true
            });
        }

        var sourceStream = gulp.src(paths);
        info('The artifacts to be used are in: ', paths, '.');
        info('The artifacts will be generated in: %s.', config.paths.build.css);
        if (argv.mode === 'debug') {
            debug('The files to be processed by this task are:');
            sourceStream.pipe(print());
        }

        return sourceStream
            .pipe(sourcemaps.init())
            .pipe(sass(sassOptions).on('error', sass.logError))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.paths.build.css));
    });

    /**
     * @task app:js
     * @description Processes all the app JavaScript files and copy it to the build folder.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     */
    gulp.task('app:js', function() {
        info('Copying JavaScript files to: ', config.paths.build.js);

        var paths = _.union(config.paths.source.js.includes, generateExcludePath(config.paths.source.js.excludes));
        var sourceStream = gulp.src(paths);
        info('The artifacts to be used are in: ', paths, '.');
        info('The artifacts will be generated in: %s.', config.paths.build.js);
        if (argv.environment !== 'prod') {
            debug('The files to be processed by this task are:');
            sourceStream.pipe(print());
        }

        // TODO Minimizar scripts JavaScript.
        return sourceStream
            .pipe(sourcemaps.init())
            .pipe(concat(config.files.app.js))
            .pipe(gulp.dest(config.paths.build.js));
    });

    /**
     * @task app:html
     * @description Processes all HTML files (and templates) of the application and copy them to build folder.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     */
    gulp.task('app:html', function() {
        info('Copying HTML files to: %s.', config.paths.build.base);

        var paths = _.union(config.paths.source.html.includes, generateExcludePath(config.paths.source.html.excludes));
        var sourceStream = gulp.src(paths);
        info('The artifacts to be used are in: ', paths, '.');
        info('The artifacts will be generated in: %s.', config.paths.build.base);
        if (argv.mode === 'debug') {
            debug('The files to be processed by this task are:');
            sourceStream.pipe(print());
        }

        // TODO HTML replacement (incluir a referência ao CSS e JavaScripts dentro da página).
        return sourceStream.pipe(gulp.dest(config.paths.build.base));
    });

    /**
     * @task app:font
     * @description Processes all fonts of the application and copy them to buid folder.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     */
    gulp.task('app:font', function() {
        info('Copying font files to: %s.', config.paths.build.font);

        var paths = _.union(config.paths.source.font.includes, generateExcludePath(config.paths.source.font.excludes));
        var sourceStream = gulp.src(paths);
        info('The artifacts to be used are in: ', paths, '.');
        info('The artifacts will be generated in: %s.', config.paths.build.font);
        if (argv.mode === 'debug') {
            debug('The files to be processed by this task are:');
            sourceStream.pipe(print());
        }

        return sourceStream.pipe(gulp.dest(config.paths.build.font));
    });

    /**
     * @task app:image
     * @description Processes all images of the application and copy them to the build folder.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     */
    gulp.task('app:image', function() {
        info('Copying image files to: %s.', config.paths.build.image);

        var paths = _.union(config.paths.source.image.includes, generateExcludePath(config.paths.source.image.excludes));
        var sourceStream = gulp.src(paths);
        info('The artifacts to be used are in: ', paths, '.');
        info('The artifacts will be generated in: %s.', config.paths.build.image);
        if (argv.mode === 'debug') {
            debug('The files to be processed by this task are:');
            sourceStream.pipe(print());
        }

        return sourceStream.pipe(gulp.dest(config.paths.build.image));
    });

   
    /**
     * @task index:html
     * @description Injecting the JavaScript and CSS files into the index.html.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see inject
     */
    gulp.task('index:html', function() {
        info('Injecting the JavaScript and CSS files into the index HTL file: %s.', config.paths.build.base + config.files.app.index);

        var sourceStream = gulp.src(config.paths.build.base + config.files.app.index);

        var vendorCssStream = gulp.src(config.paths.build.css + config.files.vendor.css, {read: false});
        info('The vendor artifact will be used is: %s.', config.paths.build.css + config.files.vendor.css);
        if (argv.mode === 'debug') {
            debug('The files to be processed by this task are:');
            vendorCssStream.pipe(print());
        }

        var appCssStream = gulp.src(config.paths.build.css + config.files.app.css, {read: false});
        info('The application artifact will be used is: %s.', config.paths.build.css + config.files.app.css);
        if (argv.mode === 'debug') {
            debug('The files to be processed by this task are:');
            appCssStream.pipe(print());
        }

        var vendorJsStream = gulp.src(config.paths.build.js + config.files.vendor.js, {read: false});
        info('The vendor artifact will be used is: %s.', config.paths.build.js + config.files.vendor.js);
        if (argv.mode === 'debug') {
            debug('The files to be processed by this task are:');
            vendorJsStream.pipe(print());
        }

        var appJsStream = gulp.src(config.paths.build.js + config.files.app.js, {read: false});
        info('The application artifact will be used is: %s.', config.paths.build.js + config.files.app.js);
        if (argv.mode === 'debug') {
            debug('The files to be processed by this task are:');
            appJsStream.pipe(print());
        }

        return sourceStream
            .pipe(inject(vendorCssStream, {starttag: '<!-- inject:vendor:css -->', relative: true}))
            .pipe(inject(appCssStream, {starttag: '<!-- inject:app:css -->', relative: true}))
            .pipe(inject(vendorJsStream, {starttag: '<!-- inject:vendor:js -->', relative: true}))
            .pipe(inject(appJsStream, {starttag: '<!-- inject:app:js -->', relative: true}))
            .pipe(gulp.dest(config.paths.build.base));
    });

    /**
     * @task dependency
     * @description Processes the vendor artifacts and copy it to the build folder.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see sequence
     */
    gulp.task('dependency', function(callback) {
        info('Generating the dependencies artifacts.');
        return sequence('dependency:update', ['dependency:js', 'dependency:css', 'dependency:html', 'dependency:font'], callback);
    });

    /**
     * @task dependency:update
     * @description Updates the dependencies of the front-end project with bower.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     */
    gulp.task('dependency:update', function() {
        return bower({cmd: 'update'});
    });

    /**
     * @task dependency:js
     * @description Copy the JavaScript vendor files to build folder.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see bowerFiles#dev
     */
    gulp.task('dependency:js', function() {
        info('Copying JavaScript vendor files to: ', config.paths.build.js, '.');

        var paths = _.union(bowerFiles().dev().ext('js').files, config.paths.vendor.js.includes, generateExcludePath(config.paths.vendor.js.excludes));

        var sourceStream = gulp.src(paths);
        if (argv.mode === 'debug') {
            debug('The files to be copied are:');
            sourceStream.pipe(print());
        }

        return sourceStream
            .pipe(uglyfly())
            .pipe(sourcemaps.init())
            .pipe(concat(config.files.vendor.js))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.paths.build.js));
    });

    /**
     * @task dependency:css
     * @description Copy the CSS vendor files do build folder.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see bowerConfig#read
     * @see flatten
     */
    gulp.task('dependency:css', function() {
        info('Copying CSS vendor files to: ', config.paths.build.css);

        var includes = _.map(config.paths.vendor.css.includes, function(element) {
            return bowerConfig.read().directory + element;
        });
        var excludes = _.map(config.paths.vendor.css.excludes, function(element) {
            return '!' + bowerConfig.read().directory + element;
        });
        var paths = _.union(includes, excludes);
        info('The artifacts to be copied are in: ', paths);

        var sourceStream = gulp.src(paths);
        if (argv.mode === 'debug') {
            debug('The artifacts to be copied are:');
            sourceStream.pipe(print());
        }

        //return sourceStream.pipe(flatten()).pipe(gulp.dest(config.paths.build.css));
        return sourceStream
            .pipe(sourcemaps.init())
            .pipe(concat(config.files.vendor.css))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.paths.build.css));
    });

    /**
     * @task dependency:html
     * @description Copy the HTML vendor files do build folder.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     */
    gulp.task('dependency:html', function() {
        info('Copying HTML vendor files to: %s.', config.paths.build.base);
        var includes = _.map(config.paths.vendor.html.includes, function(element) {
            return bowerConfig.read().directory + element;
        });
        var excludes = _.map(config.paths.vendor.html.excludes, function(element) {
            return '!' + bowerConfig.read().directory + element;
        });
        var paths = _.union(includes, excludes);
        info('The artifacts to be copied are in: ', paths, '.');

        var sourceStream = gulp.src(paths);
        if (argv.mode === 'debug') {
            debug('The artifacts to be copied are:');
            sourceStream.pipe(print());
        }

        return sourceStream.pipe(gulp.dest(config.paths.build.base));
    });

    /**
     * @task dependency:font
     * @description Processes all vendor fonts and copy them to the build folder.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see bowerConfig#read
     * @see flatten
     */
    gulp.task('dependency:font', function() {
        info('Copying font vendor files to: %s.', config.paths.build.font);
        var includes = _.map(config.paths.vendor.font.includes, function(element) {
            return bowerConfig.read().directory + element;
        });
        var excludes = _.map(config.paths.vendor.font.excludes, function(element) {
            return '!' + bowerConfig.read().directory + element;
        });
        var paths = _.union(includes, excludes);
        info('The artifacts to be copied are in: ', paths, '.');

        var sourceStream = gulp.src(paths);
        if (argv.mode === 'debug') {
            debug('The artifacts to be copied are:');
            sourceStream.pipe(print());
        }

        return sourceStream.pipe(flatten()).pipe(gulp.dest(config.paths.build.font));
    });

    /**
     * @task server:start
     * @description Starts the server to run this application.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see connect#server
     */
    gulp.task('server:start', function() {
        info('Running server on: ', config.paths.build.base, '.');
        connect.server({
            name: 'Local Development App',
            root: config.paths.build.base,
            port: config.server.port,
            livereload: true,
        });
    });

    /**
     * @task server:stop
     * @description Stops the server to run this application.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see connect#server
     */
    gulp.task('server:stop', function() {
        info('Stopping server on: ', config.paths.build.base, '.');
        connect.server.serverClose();
    });

    /**
     * @task server:reload
     * @description Realods the artifacts on the server running this application.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see connect#server
     */
    gulp.task('server:reload', function() {
        info('Reloading server on: %s.', config.paths.build.base);
        return gulp.src(config.paths.build.base).pipe(connect.reload());
    });

    /**
     * @task watch
     * @description Watches all files of this application to reload the server.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see gulp#watch
     */
    gulp.task('watch', function() {
        gulp.watch(config.paths.source.html.includes, ['watch:app:html'])
            .on('change', function(event) { watchInfo(event); });
        gulp.watch(config.paths.source.js.includes, ['watch:app:js'])
            .on('change', function(event) { watchInfo(event); });
        gulp.watch(_.union(config.paths.source.css.includes, config.paths.source.sass.watches.includes), ['watch:app:css'])
            .on('change', function(event) { watchInfo(event); });
        gulp.watch(config.paths.source.font.includes, ['watch:app:font'])
            .on('change', function(event) { watchInfo(event); });
        gulp.watch(config.paths.source.image.includes, ['watch:app:image'])
            .on('change', function(event) { watchInfo(event); });
        gulp.watch('./bower.json', ['watch:dependency'])
            .on('change', function(event) { watchInfo(event); });
    });

    /**
     * @task watch:app:html
     * @description Processes the changings in HTML files of this application when server is started.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see gulp#watch
     */
    gulp.task('watch:app:html', function(callback) {
        return sequence('app:html', 'server:reload', callback);
    });

    /**
     * @task watch:app:js
     * @description Processes the changings in JavaScript files of this application when server is started.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see gulp#watch
     */
    gulp.task('watch:app:js', function(callback) {
        return sequence('app:js', 'server:reload', callback);
    });

    /**
     * @task watch:app:css
     * @description Processes the changings in CSS and SCSS files of this application when server is started.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see gulp#watch
     */
    gulp.task('watch:app:css', function(callback) {
        return sequence(['app:css', 'app:css:sass'], 'server:reload', callback);
    });

    /**
     * @task watch:app:font
     * @description Processes the changings in font files of this application when server is started.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see gulp#watch
     */
    gulp.task('watch:app:font', function(callback) {
        return sequence('app:font', 'server:reload', callback);
    });

    /**
     * @task watch:app:image
     * @description Processes the changings in iamge files of this application when server is started.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see gulp#watch
     */
    gulp.task('watch:app:image', function(callback) {
        return sequence('app:image', 'server:reload', callback);
    });

    /**
     * @task watch:dependency
     * @description Processes the changings in the bower definitions.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see gulp#watch
     */
    gulp.task('watch:dependency', function(callback) {
        return sequence('dependency', 'server:reload', callback);
    });



    /**
     * @task build
     * @description Processes all task necessary to build the application.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see sequence
     */
    gulp.task('build', ['clean:build'], function(callback) {
        info('Building project using environment=%s, mode=%s configurations.', argv.environment, argv.mode);

        return sequence('dependency', ['app'], 'index:html', callback);
    });

    /**
     * @task start
     * @description Starts the application before executing build.
     * @since 1.0.0
     * @version 1.0.0
     * @see gulp#task
     * @see sequence
     */
    gulp.task('start', function(callback) {
        info('Starting project using environment=%s, mode=%s configurations.', argv.environment, argv.mode);

        return sequence('build', 'server:start', 'watch', callback);
    });
}());
