const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click', () => {
        nav.classList.add('active')
    })
}

if(close){
    close.addEventListener('click', () => {
        nav.classList.remove('active')
    })
}

const products = [
    {
        id: 1,
        name: "Barcelona Home Kit",
        brand: "Nike",
        price: "Rs.27,000",
        images: ["img/products/f1.jpg", "img/products/f1a.jpg", "img/products/f1b.jpg"],
        description: "Men's FC Barcelona Home Match Jersey 25/26. Designed with iconic blaugrana stripes, this Match version is the same as players wear."
    },
    {
        id: 2,
        name: "Real Madrid Home Kit",
        brand: "Adidas",
        price: "Rs.26,000",
        images: ["img/products/f2.jpg", "img/products/f2a.jpg", "img/products/f2b.jpg"],
        description: "Official Real Madrid 25/26 Home Jersey. White elegance with modern design and adidas comfort."
    },
    {
        id: 3,
        name: "Manchester City Home Kit",
        brand: "Puma",
        price: "Rs.13,900",
        images: ["img/products/f3.jpg", "img/products/f3a.jpg", "img/products/f3b.jpg"],
        description: "Manchester City Home Jersey in sky blue by Puma. Lightweight and breathable fabric."
    },
    {
        id: 4,
        name: "AC Milan Home Kit",
        brand: "Puma",
        price: "Rs.22,600",
        images: ["img/products/f4.jpg", "img/products/f4a.jpg", "img/products/f4b.jpg"],
        description: "AC Milan official Home Kit with bold red and black stripes."
    },
    {
        id: 5,
        name: "Bayern Munich Home Kit",
        brand: "Adidas",
        price: "Rs.24,300",
        images: ["img/products/f5.jpg", "img/products/f5a.jpg", "img/products/f5b.jpg"],
        description: "Bayern Munich 25/26 Home Kit with red dominance and modern pattern."
    },
    {
        id: 6,
        name: "PSG Home Kit",
        brand: "Nike",
        price: "Rs.14,600",
        images: ["img/products/f6.jpg", "img/products/f6a.jpg", "img/products/f6b.jpg"],
        description: "Paris Saint-Germain Home Jersey featuring the iconic blue and red stripe design."
    },
    {
        id: 7,
        name: "Juventus Home Kit",
        brand: "Adidas",
        price: "Rs.18,000",
        images: ["img/products/f7.jpg", "img/products/f7a.jpg", "img/products/f7b.jpg"],
        description: "Juventus Home Kit with black and white stripes, adidas design."
    },
    {
        id: 8,
        name: "Liverpool Home Kit",
        brand: "Adidas",
        price: "Rs.16,800",
        images: ["img/products/f8.jpg", "img/products/f8a.jpg", "img/products/f8b.jpg"],
        description: "Liverpool Home Kit in classic red with modern patterns."
    },
    {
        id: 9,
        name: "Barcelona Retro Kit",
        brand: "Nike",
        price: "Rs.15,000",
        images: ["img/products/o1.jpg"],
        description: "Retro Barcelona Kit with vintage blaugrana design."
    },
    {
        id: 10,
        name: "Real Madrid Retro Kit",
        brand: "Adidas",
        price: "Rs.15,000",
        images: ["img/products/o2.jpg"],
        description: "Retro Real Madrid Kit inspired by the club's history."
    },
    {
        id: 11,
        name: "Manchester United Home Kit",
        brand: "Nike",
        price: "Rs.15,000",
        images: ["img/products/o3.jpg"],
        description: "Manchester United Home Jersey in red with modern detailing."
    },
    {
        id: 12,
        name: "AC Milan Retro Kit",
        brand: "Adidas",
        price: "Rs.15,000",
        images: ["img/products/o4.jpg"],
        description: "Retro AC Milan Kit in red and black stripes."
    },
    {
        id: 13,
        name: "Bayern Munich Retro Kit",
        brand: "Adidas",
        price: "Rs.15,000",
        images: ["img/products/o5.jpg"],
        description: "Retro Bayern Munich Kit showcasing historical design."
    },
    {
        id: 14,
        name: "Chelsea Kit",
        brand: "Adidas",
        price: "Rs.15,000",
        images: ["img/products/o6.jpg"],
        description: "Chelsea Kit in blue with white accents."
    },
    {
        id: 15,
        name: "Juventus Retro Kit",
        brand: "Nike",
        price: "Rs.15,000",
        images: ["img/products/o7.jpg"],
        description: "Retro Juventus Kit featuring the classic black and white stripes."
    },
    {
        id: 16,
        name: "Liverpool Retro Kit",
        brand: "Adidas",
        price: "Rs.15,000",
        images: ["img/products/o8.jpg"],
        description: "Retro Liverpool Kit in traditional red."
    }
];

// --- Page Specific Logic for Single Product Page ---
if (window.location.pathname.includes("sproduct.html")) {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const product = products.find(p => p.id == productId);

    if (product) {
        const mainImg = document.getElementById("mainimg");
        mainImg.src = product.images[0];
        mainImg.setAttribute('data-current-image-src', product.images[0]); // Set initial image src
        document.getElementById("productName").textContent = product.name;
        document.getElementById("productPrice").textContent = product.price;
        document.getElementById("productDesc").textContent = product.description;

        if (product.images.length > 1) {
            const smallImgsContainer = document.getElementById("smallImgs");
            smallImgsContainer.style.display = 'flex';
            smallImgsContainer.innerHTML = product.images.map(img =>
                `<div class="small-img-column"><img src="${img}" width="100%" class="small-img"></div>`
            ).join("");

            document.querySelectorAll(".small-img").forEach(img => {
                img.addEventListener("click", () => {
                    mainImg.src = img.src;
                    mainImg.setAttribute('data-current-image-src', img.src); // Update the attribute
                });
            });
        } else {
            document.getElementById("smallImgs").style.display = 'none';
        }
    }
}

// --- Auth Modal and Forms ---
const modal = document.getElementById("authModal");
const loginBtn = document.getElementById("loginBtn");
const closeBtn = document.querySelector(".modal .close");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const modalTitle = document.getElementById("modalTitle");

if(loginBtn && modal && closeBtn) {
    loginBtn.onclick = () => { modal.style.display = "flex"; }
    closeBtn.onclick = () => { modal.style.display = "none"; }
    window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; }
}

function toggleForm(){
    if(loginForm.style.display === "none"){
        loginForm.style.display = "block";
        registerForm.style.display = "none";
        modalTitle.textContent = "Login";
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
        modalTitle.textContent = "Sign Up";
    }
}

// --- Auth AJAX Functions ---
function registerUser(){
    let username = document.getElementById("regUsername").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;
    fetch('auth.php', {
        method: 'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:`action=register&username=${username}&email=${email}&password=${password}`
    }).then(res=>res.json()).then(data=>{
        if(data.status=='success') {
            alert('Registration successful! Please login.');
            toggleForm();
        } else {
            alert(data.msg);
        }
    });
}

function loginUser(){
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    fetch('auth.php', {
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:`action=login&email=${email}&password=${password}`
    }).then(res=>res.json()).then(data=>{
        if(data.status=='success'){
            modal.style.display = "none";
            checkLoginStatus();
            if(document.getElementById("cartBody")) loadCart();
        } else {
            alert(data.msg);
        }
    });
}

function logoutUser(){
    fetch('auth.php', {
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:'action=logout'
    }).then(res => res.json()).then(data => {
        if(data.status == 'success') {
            window.location.reload();
        }
    });
}

function checkLoginStatus() {
    fetch('auth.php', {
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:'action=check'
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.status=='loggedin'){
            loginBtn.innerHTML = `<i class="fa-solid fa-user"></i> Logout (${data.username})`;
            loginBtn.onclick = logoutUser;
        } else {
            loginBtn.innerHTML = '<i class="fa-solid fa-user"></i> Login';
            loginBtn.onclick = () => { modal.style.display = "flex"; }
        }
    });
}

// --- Cart Functionality ---
function addToCart() {
    const size = document.getElementById("productSize").value;
    const qty = parseInt(document.getElementById("productQty").value);
    const productId = new URLSearchParams(window.location.search).get("id");
    const priceText = document.getElementById("productPrice").textContent.replace("Rs.","").replace(",","");
    const price = parseFloat(priceText);
    const selectedImage = document.getElementById("mainimg").getAttribute('data-current-image-src'); // Get the selected image

    if (size === "Select Size") {
        alert("Please select a size");
        return;
    }

    fetch('cart.php', {
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        // Pass the selected_image to the backend
        body:`action=add&product_id=${productId}&size=${size}&quantity=${qty}&price=${price}&selected_image=${encodeURIComponent(selectedImage)}`
    }).then(res=>res.json()).then(data=>{
        if(data.status==='success'){
            alert("Added to cart!");
            updateCartIcon();
        } else {
            alert(data.msg);
        }
    });
}

const addToCartButton = document.getElementById("addToCartBtn");
if (addToCartButton) {
    addToCartButton.addEventListener("click", addToCart);
}

function updateCartIcon(){
    fetch('cart.php', {
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:'action=view'
    }).then(res=>res.json()).then(data=>{
        if(data.status==='success'){
            let totalItems = data.items.reduce((sum, item) => sum + parseInt(item.quantity), 0);
            const bagIcon = document.querySelector("#lg-bag a");
            const mobileBagIcon = document.querySelector("#mobile a");
            if(bagIcon){
                if (totalItems > 0) {
                    bagIcon.innerHTML = `<i class="fa-solid fa-bag-shopping"></i> (${totalItems})`;
                    if(mobileBagIcon) mobileBagIcon.innerHTML = `<i class="fa-solid fa-bag-shopping"></i> (${totalItems})`;
                } else {
                    bagIcon.innerHTML = `<i class="fa-solid fa-bag-shopping"></i>`;
                    if(mobileBagIcon) mobileBagIcon.innerHTML = `<i class="fa-solid fa-bag-shopping"></i>`;
                }
            }
        }
    });
}

function loadCart() {
    fetch('cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'action=view'
    })
    .then(res => res.json())
    .then(data => {
        const cartContainer = document.getElementById("cartBody");
        if (!cartContainer) return;

        if (data.status === 'success') {
            let subtotal = 0;
            cartContainer.innerHTML = "";
            
            if (data.items.length === 0) {
                cartContainer.innerHTML = '<tr><td colspan="6">Your cart is empty.</td></tr>';
                document.getElementById("cartSubtotal").textContent = "Rs.0.00";
                document.getElementById("cartTotal").textContent = "Rs.0.00";
            } else {
                data.items.forEach(item => {
                    let itemTotal = parseFloat(item.price) * parseInt(item.quantity);
                    subtotal += itemTotal;
                    cartContainer.innerHTML += `
                        <tr>
                            <td><a href="#" onclick="removeFromCart(${item.id})"><i class="far fa-times-circle"></i></a></td>
                            <td><img src="${item.selected_image || item.image || 'img/products/f1.jpg'}" alt=""></td>
                            <td>${item.name} (${item.size})</td>
                            <td>Rs.${item.price}</td>
                            <td>${item.quantity}</td>
                            <td>Rs.${itemTotal.toFixed(2)}</td>
                        </tr>
                    `;
                });

                // Update totals
                document.getElementById("cartSubtotal").textContent = "Rs." + subtotal.toFixed(2);
                document.getElementById("cartTotal").textContent = "Rs." + subtotal.toFixed(2);

                // Add payment button
                const cartTotals = document.getElementById("cartTotals"); // wrapper div/section
                document.addEventListener('click', function(e){
                    if(e.target && e.target.id == 'proceedBtn'){
                        proceedToPayment();
                    }
                });
            }
        } else {
            cartContainer.innerHTML = '<tr><td colspan="6">Please log in to view your cart.</td></tr>';
        }
    });
}

function removeFromCart(cartId){
    if (!confirm("Are you sure you want to remove this item?")) return;
    fetch('cart.php', {
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:`action=remove&id=${cartId}`
    }).then(res=>res.json()).then(data=>{
        if(data.status==='success'){
            loadCart();
            updateCartIcon();
        } else {
            alert(data.msg);
        }
    });
}

// --- Global Page Load Calls ---
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    updateCartIcon();
    if (document.getElementById("cartBody")) {
        loadCart();
    }
});