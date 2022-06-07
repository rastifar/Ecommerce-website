const convertTimeStamToDate = (timestamp) => {
  const date = new Date(timestamp).toLocaleDateString("fa-IR");
  return date;
};

function toFarsiNumber(n) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
}
const numberDivider = (number) => {
  if (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return "";
};

const isInCart = (state, id) => {
  const result = !!state.cartItems.find((item) => item.id === id);
  return result;
};

const quantityCount = (state, id) => {
  const itemIndex = state.cartItems.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    return false;
  } else {
    return state.cartItems[itemIndex].quantity;
  }
};

//to group the products based on 3 categories:'fresh/1','frozen/2','smoothie/3'
 const productCategorizer = (data) => {
  const productCategorized = data?.reduce((groupedProducts, product) => {
    const group = product.category;
    if (groupedProducts[group] == null) groupedProducts[group] = [];
    groupedProducts[group].push(product);
    return groupedProducts;
  }, {});
  return productCategorized;
};
const urlFilterOptions = (array) => {
  if (array[4]) {
    return `?category=${array[2]}&subcategory=${array[4]}`
  }
  return `?category=${array[2]}`
}
export {
  convertTimeStamToDate,
  numberDivider,
  isInCart,
  quantityCount,
  toFarsiNumber,
  productCategorizer,
  urlFilterOptions
};
