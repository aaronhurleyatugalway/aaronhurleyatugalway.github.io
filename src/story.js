let basket = JSON.parse(localStorage.getItem("data")) || [];

/* this calculates and updates the total number of items in the basket*/
let calculate = () => {
    let cartIcon = document.getElementById("cartAmount");
    let numberOfItems = basket.map((z) => z.item).reduce((x, y) => x + y, 0);
    cartIcon.innerHTML = numberOfItems;
}

calculate();

// Mobile detection based on user agent (pulled from stackoverflow)
const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function updateBackgroundImage() {

    // Get the landing page element
    const element = document.querySelector(".top");
    
    // Must be between between 1 and -1 exclusive - 0 yields no effect, 
    // negative values shift image up as the user scrolls down
    // positive values shift image down as the user scrolls down
    const parallaxEffect = -.5 
  
    // Must be the same as css background-position-y value
    const offset = -10;
  
    // Update the background-position-y style property using the vertical scroll position only if on desktop
    if (!isMobile.any()) {
      element.style.backgroundPositionY = `calc(${parallaxEffect * window.scrollY}px + ${offset}px)`;     
    }
  
  }

  function updateBackgroundImage2() {

    // Get the landing page element
    const element = document.querySelector(".middle");
    
    // Must be between between 1 and -1 exclusive - 0 yields no effect, 
    // negative values shift image up as the user scrolls down
    // positive values shift image down as the user scrolls down
    const parallaxEffect = -.5 
  
    // Must be the same as css background-position-y value
    const offset = -10;
  
    // Update the background-position-y style property using the vertical scroll position only if on desktop
    if (!isMobile.any()) {
      element.style.backgroundPositionY = `calc(${parallaxEffect * window.scrollY}px + ${offset}px)`;     
    }
  

  }
  
  window.addEventListener('scroll', updateBackgroundImage);
  window.addEventListener('scroll', updateBackgroundImage2);

  