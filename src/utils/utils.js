 const convertTimeStamToDate = (timestamp) => {
  const date = new Date(timestamp).toLocaleDateString("fa-IR");
  return date;
};

function toFarsiNumber(n) {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  return n
      .toString()
      .replace(/\d/g, x => farsiDigits[x]);
}
 const numberDivider = (number) => {
  if (number) {    
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return ""
}

 const isInCart = (state,id) => {
   const result = !!state.cartItems.find(item => item.id === id) 
  return result
}

 const quantityCount = (state, id) => {
   const itemIndex = state.cartItems.findIndex(item => item.id === id)
 
  if (itemIndex === -1) {
    return false
  } else {   
    return state.cartItems[itemIndex].quantity
  }
}


export {convertTimeStamToDate,numberDivider,isInCart,quantityCount ,toFarsiNumber};