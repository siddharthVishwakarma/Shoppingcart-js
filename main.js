let shop = document.getElementById("shop");

let shopItemData = [
  {
    id: 1,
    img: "images/img-1.jpg",
    name: "Casual Shirt",
    desc: "Ad non enim Lorem esse labore ea dolore ipsum in consequat labore ad.",
    price: 100,
  },
  {
    id: 2,
    img: "images/img-2.jpg",
    name: "Formal Shirt",
    desc: "Ad non enim Lorem esse labore ea dolore ipsum in consequat labore ad.",
    price: 145,
  },
  {
    id: 3,
    img: "images/img-8.png",
    name: "Tshirt",
    desc: "Ad non enim Lorem esse labore ea dolore ipsum in consequat labore ad.",
    price: 45,
  },
  {
    id: 4,
    img: "images/img-4.jpg",
    name: "Mens Suit",
    desc: "Ad non enim Lorem esse labore ea dolore ipsum in consequat labore ad.",
    price: 455,
  },
];

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
    .join("")); //To remove the commma while joining shop item data
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

  if (search.item === 0) return; // If their is 0 item in basket then stop
  else {
    search.item -= 1; //else remove item one by one
  }
  localStorage.setItem("data", JSON.stringify(basket)); //adding local storage to save decriment data
  //   console.log(basket);
  update(selectedItem);
};

// Update the quantity of item in the card
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //   console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculate();
};

// To calculate the count on the the shopping cart icon
let calculate = () => {
  const cartIcon = document.getElementById("cartAmount");

  // selecting only items from the basket then add it
  let total = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  cartIcon.innerHTML = total;
};

calculate(); //For saving the data in the cart
