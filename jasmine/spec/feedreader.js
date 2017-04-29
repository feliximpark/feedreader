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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it("urls of each feed are defined and are not empty", function(){
            for (var i=0; i<allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe(allFeeds[i].url.lenght<1);
            }
         });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it("name of each feed is defined and not empty", function(){
            for(var i = 0; i<allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe(allFeeds[i].name.length<1);
            }
         });
      });
    // /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function(){
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         // Declaring the variable body for all following it-Statements
        // var body includes the HTML-body
        var body = document.getElementsByTagName('body')[0];
        it('menu element is hidden by default', function(){
            //checking if after a fresh reload the body-element has the class menu-hidden
            expect(body.className).toBe("menu-hidden");
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        // testing by checking the status of the body-class before and after clicking the burger-menu-symbol
        it ("menu display and hide when it´s clicked", function(){
            var button = document.getElementsByClassName("menu-icon-link")[0];
            button.click();
            expect(body.className).not.toBe("menu-hidden");
            button.click();
            expect(body.className).toBe("menu-hidden");
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function(){
         // TODO: Write a test that ensures when the loadFeed
         // * function is called and completes its work, there is at least
         // * a single .entry element within the .feed container.
         // * Remember, loadFeed() is asynchronous so this test will require
         // * the use of Jasmine's beforeEach and asynchronous done() function.
        // beforeEach for secure that the AJAX-call is done before testing
        //using the beforeEach- and done-methods of jasemine
        beforeEach(function(done){
            loadFeed(0,function(){
                   done();
            });
        });
        //checking if the div.feed has a child. The child is created, when the AJAX-call delivers results and doesn´t fail.
        it ("LoadFeed is called and delivers at least one result", function(done){
            var container = document.getElementsByClassName("feed")[0];
            expect(container.hasChildNodes()).toBe(true);
            done();
         });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        // first we declaring variables, where we store the url of the first child of the feed-div after the first and second AJAX-Call.
        // var selector includes the feed-div
        var firstUrl,
            secondUrl,
            selector = document.getElementsByClassName("feed")[0];
        // secure with the jasemine beforeEach and done-method, that the first and the second AJAX-call are finished before testing
        // nesting the second AJAX-call into the first one
        // after each AJAX-Call, putting the urls of the first <a href> into a variable
        beforeEach(function(done){
            loadFeed(0,function(results){
                firstUrl = selector.children[0].href;
                console.log(firstUrl);
                loadFeed(1, function(results){
                    secondUrl = selector.children[0].href;
                    console.log(secondUrl);
                });
                done();
            });
        });
        //testing if each AJAX-call has a different first link as a result
        it("Content changes when new feed is loaded",function(done){
            expect(firstUrl).not.toBe(secondUrl);
            done();
        });
    });
}());