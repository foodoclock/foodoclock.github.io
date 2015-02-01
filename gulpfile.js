var gulp = require('gulp');
var webserver = require('gulp-webserver');
var git = require('gulp-git');
var prompt = require('gulp-prompt');
var template = require('gulp-template');
var rename = require('gulp-rename');

gulp.task('serve', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: false,
      fallback: 'index.html',
      open: true
    }));
});

gulp.task('recipe:new', function() {

  var nameToSlug = function nameToSlug(name) {
    return name.replace(/ +/ig, '-')
               .toLowerCase()
               .replace(/[^a-z0-9\-]+/g, '');
  };

  var generateNewJSON = function generateNewJSON(name, slug) {
    gulp.src('templates/_recipe.json')
      .pipe(template({ recipe: { name: name } }))
      .pipe(rename(slug + '.json'))
      .pipe(gulp.dest('store/recipes'));
  };

  var hasExistingChanges = function hasExistingChanges(callback) {

    git.status({args : '--porcelain'}, function (err, stdout) {
      callback(stdout && stdout.length > 0);
    });

  };

  var createBranch = function createBranch(name) {

    var slug = nameToSlug(name);

    hasExistingChanges(function callback(hasChanges) {
      if(hasChanges) {
        console.error('ERROR: Make sure to commit or stash all your existing changes');
      } else {
        git.checkout('recipe/' + slug, { args: '-b' }, function (err) {
          if(!!err) {
            console.error(err);
          } else {
            generateNewJSON(name, slug);
          }
        });
      }
    });

  };

  gulp.src('')
    .pipe(prompt.prompt({
        type: 'input',
        name: 'recipeName',
        message: 'Name of the new recipe?'
    }, function(res){
      createBranch(res.recipeName);
    }));

});
