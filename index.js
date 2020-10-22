function showHideHeader() {
  var doc = document.documentElement;
  var w = window;

  var prevScroll = w.scrollY || doc.scrollTop;
  var curScroll;
  var direction = 0;
  var prevDirection = 0;

  var header = document.querySelector(".site-header");

  var checkScroll = function () {
    /*
     ** Find the direction of scroll
     ** 0 - initial, 1 - up, 2 - down
     */

    curScroll = w.scrollY || doc.scrollTop;
    if (curScroll > prevScroll) {
      //scrolled up
      direction = 2;
    } else if (curScroll < prevScroll) {
      //scrolled down
      direction = 1;
    }

    if (direction !== prevDirection) {
      toggleHeader(direction, curScroll);
    }

    prevScroll = curScroll;
  };

  var toggleHeader = function (direction, curScroll) {
    if (direction === 2 && curScroll > 450) {
      //replace 52 with the height of your header in px

      header.classList.add("site-header--scrolled");
      prevDirection = direction;
    } else if (direction === 1) {
      header.classList.remove("site-header--scrolled");
      prevDirection = direction;
    }
  };

  window.addEventListener("scroll", checkScroll);
}

function changeBannerImage() {
  var images = [
    "https://images.unsplash.com/photo-1540581051935-d5bd440113c1",
    "https://images.unsplash.com/photo-1455577380025-4321f1e1dca7",
    "https://images.unsplash.com/photo-1504033017863-0d90ed4d81c1",
    "https://images.unsplash.com/photo-1465427017340-dcc817cc0c30",
  ];

  var siteBanner = document.querySelector(".site-banner__image");

  siteBanner.src = images[Math.floor(Math.random() * images.length)];
}

function showCurrentEntry() {
  var currentHeader = document.querySelector(".current-article-header");
  var currentHeaderTitle = currentHeader.querySelector(".current-article-header__title");
  var currentHeaderLink = currentHeader.querySelector(".current-article-header__link")
  var blogPosts = document.querySelectorAll(".blog-entry");

  gsap.set(currentHeader, {opacity: 0, y: -80})

  window.addEventListener("scroll", function () {
    blogPosts.forEach((blogPost) => {
      var title = blogPost.querySelector('.blog-entry__title').innerText;
      var postLink = blogPost.querySelector('.blog-entry__link').href;
      var blogPostPositionY = blogPost.offsetTop - document.documentElement.scrollTop;
  
      // if-statement: show currentHeader if blogPost is in viewport and have scrolled above window
      // first else if: hide currentHeader between two blogposts
      // second else if: hide currentHeader if blogpost is in viewport but haven't scrolled above window
      if (isElementInViewport(blogPost) && blogPostPositionY <= 0) {
        currentHeader.dataset.currentPost = blogPost.id
        gsap.to(currentHeader, {duration: 0.5, y: 0, opacity: 1});
        currentHeaderTitle.innerText = title
        currentHeaderLink.href = postLink
      } else if ((!isElementInViewport(blogPost)) && blogPostPositionY <= 0 && currentHeader.dataset.currentPost === blogPost.id) {
        gsap.to(currentHeader, {duration: 0.3, y: -80, opacity: 0});
        gsap.set(currentHeader, {opacity: 0, y: -80})
        currentHeader.dataset.currentPost = null
      } else if ((isElementInViewport(blogPost)) && !(blogPostPositionY <= 0) && currentHeader.dataset.currentPost === blogPost.id) {
        gsap.to(currentHeader, {duration: 0.3, y: -80, opacity: 0});
        gsap.set(currentHeader, {opacity: 0, y: -80})
        currentHeader.dataset.currentPost = null
      }
    });
  });
}

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left <
      (window.innerWidth ||
        document.documentElement.clientWidth) /* or $(window).width() */ &&
    rect.top <
      (window.innerHeight ||
        document.documentElement.clientHeight) /* or $(window).height() */
  );
}

function main() {
  showHideHeader();
  showCurrentEntry();
}

changeBannerImage();
window.addEventListener("load", main);

var image = document.getElementsByClassName("site-banner__image");
new simpleParallax(image, {
  customWrapper: ".site-banner",
  scale: 1.2,
});
