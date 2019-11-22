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
    //Test suite for the RSS Feed
    describe('RSS Feeds', function() {

        // Ensure list of RSS feeds are defined
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Ensure each feed contains a URL
        it('contain a URL', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("");
            }
        });

        // Ensure each feed contains a Name
        it('contain a Name', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("");
            }
        });
    });


    // Test suite for the menu
    describe('The Menu', function() {
        // Ensure the menu is hidden by default
        it('hidden by default', function() {
            let body = $('body')[0];
            expect(body).toHaveClass('menu-hidden');
        });

        // Ensure menu shows when button is pressed,
        // and hides when pressed again
        it('menu button functions properly', function() {
            let menuIcon = $('.menu-icon-link');
            let body = $('body')[0];

            if (body.classList.contains('menu-hidden')) {
                menuIcon.click();
                expect(body).not.toHaveClass('menu-hidden');
                menuIcon.click();
                expect(body).toHaveClass('menu-hidden');
            } else {
                menuIcon.click();
                expect(body).toHaveClass('menu-hidden');
                menuIcon.click();
                expect(body).not.toHaveClass('menu-hidden');
            }
        });
    });

    // Test suite for the initial feed entries
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // Ensure there is at least one .entry element
        it('ensure there is at least one entry', function(done) {
            let check = $('.feed .entry');
            expect(check.length).toBeGreaterThan(0);
            done();
        });
    });

    // Test suite for new feed selection
    describe('New Feed Selection', function() {
        let firstFeed, secondFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed')[0].firstElementChild;

                loadFeed(1, function() {
                    secondFeed = $('.feed')[0].firstElementChild;
                    done();
                });
            });
        });

        // Ensure feed entries change when choosing a new feed
        it('ensure feed changes', function(done) {
            expect(firstFeed).not.toEqual(secondFeed);
            done();
        });
    });
}());
