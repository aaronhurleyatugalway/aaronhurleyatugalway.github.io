let navbar = document.getElementById("navbar");

navbar.innerHTML = `<h2><a href="index.html"><img src="images/locologo.jpg" width="160px"></h2></a>

<div class="notindex">
    <a href="shop.html" class="shoplink">SHOP <i class="bi bi-shop"></i></a>
    
    <a href="cart.html">
    <div class="cart">
        <i class="bi bi-cart2"></i>
        <div id="cartAmount" class="cartAmount">0</div>
    </div>
    </a>
    </div>`

/* Note that index.js has a version of this for second nav bar */