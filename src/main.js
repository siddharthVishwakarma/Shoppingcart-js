let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || []; //retriving the data from the local storage

let genreateShop = () => {
  return (shop.innerHTML = shopItemData
    .map((x) => {
      let { id, img, desc, name, price } = x;
      let search = basket.find((x) => x.id === id) || []; //check for the item id in the basket
      return `
    <div id=product-id-${id} class="item">
    <img width="220" src=${img} alt="image">
    <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
                <i onclick="decriment(${id})" class="bi bi-dash-square"></i>
                <div id=${id} class="quantity">
                ${search.item === undefined ? 0 : search.item}
                </div>
                <i onclick="increment(${id})" class="bi bi-plus-square"></i>
            </div>
        </div>
       </div>
      </div>
    `;
    })
    .join("")); //! To remove the commma while joining shop item data
};

genreateShop();

// To incriment the card count
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
  //   console.log(basket);
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

  localStorage.setItem("data", JSON.stringify(basket)); //adding local storage to save decriment data
};

// Update the quantity of item in the card
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //   console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculate();
};

// To calculate the count in the the shopping cart icon
let calculate = () => {
  const cartIcon = document.getElementById("cartAmount");

  // selecting only items from the basket then add it
  let total = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  cartIcon.innerHTML = total;
};

calculate(); //For saving the data in the cart
