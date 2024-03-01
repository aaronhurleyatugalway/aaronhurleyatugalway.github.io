let navbar = document.getElementById("navbar");
let navbar2 = document.getElementById("navbar2");
var x = window.matchMedia("(max-width: 500px)")



    function smallWindow(x) {
        if (x.matches) { // If media query matches
            navbar.innerHTML = `<h2><a href="index.html"><img id="logoimage1" src="images/locologo.jpg" width="100px"></h2></a><br><p>

            <div class="notindex">
                <a href="shop.html" class="shoplink">SHOP <i class="bi bi-shop"></i>&nbsp;</a>
                
                <a href="cart.html">
                <div class="cart">
                    <i class="bi bi-cart2"></i>
                    <div id="cartAmount" class="cartAmount">0</div>
                </div>
                </a>
                </div></p>`;
                if (navbar2){
            navbar2.innerHTML = `<h2><a href="index.html"><img id="logoimage2" src="images/locologo.jpg" width="100px"></h2></a><br><p>

                <div class="notindex">
                    <a href="shop.html" class="shoplink">SHOP <i class="bi bi-shop"></i>&nbsp;</a>
                    
                    <a href="cart.html">
                    <div class="cart">
                        <i class="bi bi-cart2"></i>
                        <div id="cartAmount2" class="cartAmount">0</div>
                    </div>
                    </a>
                    </div></p>`;}
            
        } 
        else {

            navbar.innerHTML = `<h2><a href="index.html"><img id="logoimage1" src="images/locologo.jpg" width="160px"></h2></a>

    <div class="notindex">
    <a href="shop.html" class="shoplink">SHOP <i class="bi bi-shop"></i></a>
    
    <a href="cart.html">
    <div class="cart">
        <i class="bi bi-cart2"></i>
        <div id="cartAmount" class="cartAmount">0</div>
    </div>
    </a>
    </div>`
        }
        }

    smallWindow(x);

/* Note that index.js has a version of this for second nav bar */