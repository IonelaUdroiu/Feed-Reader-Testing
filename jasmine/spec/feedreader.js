/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // Test the RSS feeds
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Test if each feed has an URL defined and if the URL is not empty.
        it('Feed URL is defined and is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeTruthy();
              });
        });

        // Test if each feed has a name defined and if the name is not empty.
         it('Feed name is defined and is not empty', function() {
             allFeeds.forEach(function(feed) {
                 expect(feed.name).toBeTruthy();
               });
         });
    });

    // Test the menu
    describe('The menu', function() {
        // Test if the menu is hidden by default.
         it('The menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         // Test if the menu changes visibility when the menu icon is clicked.
          it('The menu changes visibility on click', function() {
             var menuIcon = document.querySelector('a.menu-icon-link');
             menuIcon.click();
             expect($('body').hasClass('menu-hidden')).toBe(false);
             menuIcon.click();
             expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    //Test feeds loading
    var feed = document.querySelector('.feed')

    describe('Initial Entries', function() {
        // Test if feeds are loading
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('There is at least one entry', function() {
            expect(feed.getElementsByClassName('entry').length).toBeGreaterThan(0);
        });
    });

    // Test new feed selection
    describe('New Feed Selection', function() {
        // Test if new feeds are loaded
        var initialFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                initialFeed = feed.innerHTML;
                loadFeed(1, done);
            });
        });

        it('New feed is different from initial feed', function() {
            var newFeed = feed.innerHTML;
            expect(newFeed).not.toBe(initialFeed);
        });
    });

}());
