function doesCartIncludeSubscription(cart){
  if(!cart || !cart.items || !cart.items.length){
    return null;
  }
  var subscription_items = cart.items.filter(function(item){ return item.properties && item.properties.group_id })
  if(subscription_items.length){
    return true;
  }
  return false;
}

function checkExistingSubscription(){
  var request = new XMLHttpRequest();
  request.open('GET', '/cart.js', true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var cart = JSON.parse(request.responseText);
      if(doesCartIncludeSubscription(cart)){
        window.location.reload();
      }
    }
  };
  request.send();
}
