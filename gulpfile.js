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

var getCurrentBranchName = function getCurrentBranchName(callback) {
  git.exec({args : 'rev-parse --abbrev-ref HEAD'}, function (err, stdout) {
    callback(stdout.trim());
  });
};

var isBranch = function isBranch(name, callback) {
  getCurrentBranchName(function branchNamecallback(branchName) {
    callback(name === branchName);
  });
};

var recipeRegex = function recipeRegex(str) {
  var matches = str.match(/^recipe\/.+/);
  return matches && matches.length > 0;
};

var isRecipeBranch = function isRecipeBranch(callback) {
  getCurrentBranchName(function branchNamecallback(branchName) {
    callback(recipeRegex(branchName));
  });
};

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

  var checkout = function checkout(name, slug) {
    git.checkout('recipe/' + slug, { args: '-b' }, function (err) {
      if(!!err) {
        console.error(err);
      } else {
        generateNewJSON(name, slug);
      }
    });
  };

  var createBranch = function createBranch(name) {

    var slug = nameToSlug(name);

    hasExistingChanges(function callback(hasChanges) {
      if(hasChanges) {
        console.error('ERROR: Make sure to commit or stash all your existing changes');
      } else {
        isBranch('master', function callback(isMasterBranch) {
          if(isMasterBranch) {
            checkout(name, slug);
          } else {
            console.error('ERROR: You must run this task from the master branch');
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

gulp.task('recipe:save', function() {

  getCurrentBranchName(function callback(branchName) {
    if(recipeRegex(branchName)) {
      var file = 'store/recipes/' + branchName.replace('recipe/', '').replace('/', '_') + '.json';
      git.exec({args: 'add ' + file}, function () {
        git.exec({args: 'commit -m "Saved using gulp task \'recipe:save\'" ' + file}, function() {
          git.push('origin', branchName, function (err) {
            if(!!err) {
              console.error(err);
            } else {
              console.log('Recipe has been saved');
            }
          });
        });
      });
    }
  });

});
