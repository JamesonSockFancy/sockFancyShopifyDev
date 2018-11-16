window.BOLD = window.BOLD || {}
BOLD.BMS = BOLD.BMS || {}
BOLD.BMS.Sockfancy = BOLD.BMS.Sockfancy || {}

BOLD.BMS.Sockfancy.fixMore = function(cart){
  if(cart.items && cart.items.length){
    cart.total_price = cart.items.reduce(function(total_price,item){
      //CartDoctor is expected to have run first - if so, the original properties list will have moved to properties_all
      var properties = item.properties_all || item.properties;
      if(properties && properties.total_recurrences){
        //Adjust the price of the items based on the number of shipments being paid for in the block.
        var prepay_discount = 1 - parseFloat(properties._prepay_discount || 0);
        item.price = item.price * parseInt(properties.total_recurrences) * prepay_discount;
        item.line_price = item.price * item.quantity;

        //CartDoctor doesn't know to sanitize these from the 'public' properties, so also remove non-underscored properties that are supposed to be hidden
        delete item.properties.is_prepaid;
        delete item.properties.prepaid_length_id;
      }
      //Update total price of the cart appropriately.
      total_price += item.line_price;
      return total_price;
    },0)
  }
  return cart;
}
