let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || []; //retriving the data from the local storage

// To calculate the count in the the shopping cart icon
let calculate = () => {
  const cartIcon = document.getElementById("cartAmount");

  // selecting only items from the basket then add it
  let total = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  cartIcon.innerHTML = total;
};

calculate();

let genrateCartItem = () => {
  // When local storage is not empty
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemData.find((y) => y.id === id) || [];
        return `
            <div class="cart-item">
                <img width=100 src=${search.img} alt="" />
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-pice">$${search.price}</p>
                        </h4>
                        <i class="bi bi-x-square"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="decriment(${id})" class="bi bi-dash-square"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-square"></i>
                    </div>
                    <h3>$${item * search.price}</h3>
                </div>
            </div>
        `;
      })
      .join(""));
  }
  // when cart is empty
  else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="index.html">
            <button class="homeBtn">Back to Homepage</button>
        </a>
    `;
  }
};

genrateCartItem();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);

  if (search === undefined) {
    //   If item does not exist then push the item in the basket
    basket.push({
      id: selectedItem,
      item: 1,
    });
    // If item already exist then increase the count
  } else {
    search.item += 1;
  }
  localStorage.setItem("data", JSON.stringify(basket)); //adding local storage to save incriment data
  genrateCartItem();
  update(selectedItem);
};

// To decriment the card count
let decriment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);

  // If item is undifined then stop the process
  if (search === undefined) return; //! resolved the Uncaught TypeError
  // If basket item is 0 then stop the process
  else if (search.item === 0) return;
  else {
    search.item -= 1; //else remove item one by one
  }

  update(selectedItem);
  // After updating the data in basket remove the item from the array which have 0 quantity
  basket = basket.filter((x) => x.item !== 0);
  genrateCartItem();
  localStorage.setItem("data", JSON.stringify(basket)); //adding local storage to save decriment data
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //   console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculate();
};
