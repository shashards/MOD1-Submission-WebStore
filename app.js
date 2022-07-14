//List of Products

var products = [
    {
        title: "Shirt",
        image: "https://cdn.shopify.com/s/files/1/0073/0057/9392/products/mtp_shirt_pcs_issue500_1080x.jpg?v=1556984826",
        description: "Shirt",
        NSN: "0000-00-0000-02",
        category: "top",
        sizes: '<select name="sz" class="my-2"><option value="160/104">160/104</option><option value="170/104">170/104</option><option value="170/112">170/112</option><option value="180/96">180/96</option><option value="180/104">180/104</option><option value="180/112">180/112</option><option value="190/104">190/104</option><option value="190/112">190/112</option><option value="200/104">200/104</option><option value="200/112">200/112</option></select>'
    },
    {
        title: "Jacket",
        image: "https://cdn.shopify.com/s/files/1/0073/0057/9392/products/MTP-PCS-SMOCK_1080x.jpg?v=1557306649",
        description: "Jacket",
        NSN: "0000-00-0000-03",
        category: "top",
        sizes: '<select name="sz" class="my-2"><option value="160/104">160/104</option><option value=" 170/104"> 170/104</option><option value=" 170/112"> 170/112</option><option value=" 180/96"> 180/96</option><option value=" 180/104"> 180/104</option><option value=" 180/112"> 180/112</option><option value=" 190/104"> 190/104</option><option value=" 190/112"> 190/112</option><option value=" 190/120"> 190/120</option><option value=" 200/112"> 200/112</option></select>'
    },
    {
        title: "Trousers",
        image: "https://cdn.shopify.com/s/files/1/0073/0057/9392/products/mtp-pcs-combat-trousers.jpg?v=1556981618",
        description: "Trousers",
        NSN: "0000-00-0000-01",
        category: "bottom",
        sizes: '<select name="sz" class="my-2"><option value="75/68/84">75/68/84</option><option value=" 70/72/88"> 70/72/88</option><option value=" 80/72/88"> 80/72/88</option><option value=" 70/80/96"> 70/80/96</option><option value=" 90/96/112"> 90/96/112</option><option value=" 90/100/116"> 90/100/116</option><option value=" 85/104/120"> 85/104/120</option><option value=" 90/104/120"> 90/104/120</option><option value=" 85/108/124"> 85/108/124</option><option value=" 90/108/124"> 90/108/124</option><option value=" 85/112/128"> 85/112/128</option></select>'
    },
    {
        title: "Bush Hat",
        image: "https://www.helikon-tex.com/media/catalog/product/cache/4/image/500x/17f82f742ffe127f42dca9de82fb58b1/K/A/KA-PCS-PT-kapelusz_pcs_-_polycotton_twill-1-1000_1.jpg",
        description: "Hat",
        NSN: "0000-00-0000-04",
        category: "accessory",
        sizes: '<select name="sz" class="my-2"><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option><option value="60">60</option><option value="61">61</option><option value="62">62</option></select>'
    },     
];

// Populate Page with Products from Array

var productsHtml = '';

products.forEach(function(addProduct){
productsHtml += '<div class="card mb-4 filter-div ' + addProduct.category + '" style="min-width: 18rem;"><img id="productimg" src="' + addProduct.image
+ '" class="card-img-top w-50 mx-auto d-block"><div class="card-body"><h5 id="title" class="card-title">' + addProduct.title
+ '</h5><hr class="my-2">' + addProduct.sizes + '<p id="NSN" class="text-muted">' + addProduct.NSN
+ '</p><p><button type="button" class="btn btn-lg btn-block btn-block btn-outline-primary addcart">Add to Cart</button></p></div></div>';
document.getElementById('productrow').innerHTML = productsHtml;
});

// Cart Functionality

var itemQty = 0;

function showTotals(){
itemQty = 0;
var elements = document.querySelectorAll(".form-control");
for (var i=0; i < elements.length; i++) {
        itemQty += parseInt(elements[i].value);
}   
document.getElementById('cart-total').textContent = itemQty;
document.getElementById('cart-total-page').textContent = itemQty;
}

// Add to Cart PopUp Fade Effect

function fadeOutEffect() {
    var fadeTarget = document.getElementById("cart-alert");
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 100);
}

// Check If Item Is Already In Cart 

var checkTitle = [];
var cartCheck = [];
var check = "";
var cartCheckStr = "";

function alreadyAdded() {
var elements = document.querySelectorAll(".cart-item");
cartCheck = [];
for (var i=0; i < elements.length; i++) {
        cartCheck.push(elements[i].childNodes[1].innerText);
}
cartCheckStr = cartCheck.toString();
check = (cartCheckStr.includes(checkTitle));
};

//Add Item To Cart

function monitorCartAdds() {
var cartBtn = document.querySelectorAll(".addcart");
cartBtn.forEach(function(btn){
    btn.addEventListener("click", function(event){
        if(event.target.parentElement.parentElement.parentElement.classList.contains("card")){
            let fullPath = event.target.parentElement.parentElement.previousElementSibling.src;
            var item = {};
            let itemTitle = event.target.parentElement.parentElement.childNodes[0].textContent;
            checkTitle = itemTitle;
            let itemDesc = event.target.parentElement.parentElement.childNodes[1].textContent;
            let itemNSN = event.target.parentElement.parentElement.childNodes[3].textContent;
            item.img = fullPath;
            item.title = itemTitle;
            item.desc = itemDesc;
            item.NSN = itemNSN;
            check = "";
            alreadyAdded();
            if(check === false){
                var cartItem = document.createElement('div');
                cartItem.classList.add(
                "cart-item",
                "d-flex",
                "justify-content-between",
                "text-capitalize",
                "my-3"
                    );
                cartItem.innerHTML = '<img src="' + item.img + '" class="rounded-circle w-25" id="item-img" alt=""><div class="item-text"><p id="cart-item-title" class="font-weight-bold mb-0">' + item.title + '</p><span class="text-muted">NSN </span><span id="cart-item-NSN" class="cart-item-NSN text-muted" class="mb-0">' + item.NSN + '</span></div><div class="form-group row"><div class="col-xs-1"><div class="form-group"><select class="form-control" id="sel1"><option value=1 selected>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option></select></div></div><a class="cart-item-remove nav-link">X</a></div>';
                var cart = document.getElementById('cart');
                var total = document.getElementsByClassName('cart-total-container');
                cart.insertBefore(cartItem, null);
                var dupeFalse = document.getElementById("cart-alert-parent");
                dupeFalse.innerHTML = '<div id="cart-alert" class="alert alert-success" role="alert">Added To Cart</div>';                
                document.getElementById("cart-alert").style.visibility = "visible";
                document.getElementById("cart-alert").style.opacity = "1";
                fadeOutEffect();
                showTotals();
            } else {
                var dupeTrue = document.getElementById("cart-alert-parent");
                dupeTrue.innerHTML = '<div id="cart-alert" class="alert alert-warning" role="alert">Already In Your Cart</div>';                
                document.querySelectorAll(".alert-warning")[0].style.visibility = "visible";
                document.querySelectorAll(".alert-warning")[0].style.opacity = "1";
                fadeOutEffect();
            }
        }
    });
});

};

// Clear Cart 

var clearCartBtn = document.getElementById("clear-cart");

clearCartBtn.addEventListener("click", function(){    
var parent = document.getElementById("cart");
parent.innerHTML = '';
showTotals();
});

// Remove Items 

function removeItem(){
var element = document.getElementById("cart");
element.addEventListener('click', function(remove){
    if(remove.target.matches('.cart-item-remove')){
        var cartItemRemove = remove.target.parentElement.parentElement;
        cartItemRemove.remove();
        showTotals();
    }
});

};

// Monitor Quantity 

document.addEventListener('change', function(event){
if (event.target.classList.contains('form-control')){
    showTotals();
}
}, false);

// Filter Products

filterSelection("all")
function filterSelection(c) {
var x, i;
x = document.getElementsByClassName("filter-div");
if (c == "all") c = "";
// Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
for (i = 0; i < x.length; i++) {
RemoveClass(x[i], "show");
if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
}
}

// Show filtered elements

function AddClass(element, name) {
var i, arr1, arr2;
arr1 = element.className.split(" ");
arr2 = name.split(" ");
for (i = 0; i < arr2.length; i++) {
if (arr1.indexOf(arr2[i]) == -1) {
  element.className += " " + arr2[i];
}
}
}

// Hide elements that are not selected

function RemoveClass(element, name) {
var i, arr1, arr2;
arr1 = element.className.split(" ");
arr2 = name.split(" ");
for (i = 0; i < arr2.length; i++) {
while (arr1.indexOf(arr2[i]) > -1) {
  arr1.splice(arr1.indexOf(arr2[i]), 1);
}
}
element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)

var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
btns[i].addEventListener("click", function() {
var current = document.getElementsByClassName("active");
current[0].className = current[0].className.replace(" active", "");
this.className += " active";
});
}

monitorCartAdds();
removeItem();