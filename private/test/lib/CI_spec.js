var expect = require('chai').expect;
var CI = require('../../lib/CI');

describe('CI', function() {
  describe('CI.isPullRequest', function() {

    describe('when TRAVIS_PULL_REQUEST is \'false\'', function() {

      beforeEach('make TRAVIS_PULL_REQUEST \'false\'', function() {
        process.env.TRAVIS_PULL_REQUEST = 'false';
      });

      it('is not a pull request', function(done) {
        expect(CI.isPullRequest()).to.be.false;
        done();
      });

    });

    describe('when TRAVIS_PULL_REQUEST is false', function() {

      beforeEach('make TRAVIS_PULL_REQUEST false', function() {
        process.env.TRAVIS_PULL_REQUEST = false;
      });

      it('is not a pull request', function(done) {
        expect(CI.isPullRequest()).to.be.false;
        done();
      });

    });

    describe('when TRAVIS_PULL_REQUEST is a commit SHA', function() {

      beforeEach('make TRAVIS_PULL_REQUEST contain a SHA', function() {
        process.env.TRAVIS_PULL_REQUEST = '53dd59607079c97c6dfdfd8fbd55132e227fc779';
      });

      it('is a pull request', function(done) {
        expect(CI.isPullRequest()).to.be.true;
        done();
      });

    });

  });

  describe('CI.isPreReleaseBranch', function() {

    describe('when TRAVIS_BRANCH is pre-release', function() {

      beforeEach('make TRAVIS_BRANCH pre-release', function() {
        process.env.TRAVIS_BRANCH = 'pre-release';
      });

      it('is the pre-release branch', function(done) {
        expect(CI.isPreReleaseBranch()).to.be.true;
        done();
      });

    });

    describe('when TRAVIS_BRANCH is not pre-release', function() {

      beforeEach('make TRAVIS_BRANCH not-pre-release', function() {
        process.env.TRAVIS_BRANCH = 'not-pre-release';
      });

      it('is not the pre-release branch', function(done) {
        expect(CI.isPreReleaseBranch()).to.be.false;
        done();
      });

    });

  });

  describe('CI.isReadyForPublication', function() {

    describe('when it is a pull request and the branch is pre-release', function() {

      beforeEach(function() {
        process.env.TRAVIS_BRANCH = 'pre-release';
        process.env.TRAVIS_PULL_REQUEST = '53dd59607079c97c6dfdfd8fbd55132e227fc779';
      });

      it('is not ready for publication', function(done) {
        expect(CI.isReadyForPublication()).to.be.false;
        done();
      });

    });

    describe('when it is a pull request and the branch is not pre-release', function() {

      beforeEach(function() {
        process.env.TRAVIS_BRANCH = 'not-pre-release';
        process.env.TRAVIS_PULL_REQUEST = '53dd59607079c97c6dfdfd8fbd55132e227fc779';
      });

      it('is not ready for publication', function(done) {
        expect(CI.isReadyForPublication()).to.be.false;
        done();
      });

    });

    describe('when it is not a pull request and the branch is not pre-release', function() {

      beforeEach(function() {
        process.env.TRAVIS_BRANCH = 'not-pre-release';
        process.env.TRAVIS_PULL_REQUEST = 'false';
      });

      it('is not ready for publication', function(done) {
        expect(CI.isReadyForPublication()).to.be.false;
        done();
      });

    });

    describe('when it is not a pull request and the branch is pre-release', function() {

      beforeEach(function() {
        process.env.TRAVIS_BRANCH = 'pre-release';
        process.env.TRAVIS_PULL_REQUEST = 'false';
      });

      it('is not ready for publication', function(done) {
        expect(CI.isReadyForPublication()).to.be.true;
        done();
      });

    });

  });
});
