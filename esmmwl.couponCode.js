var URLccid = lookForCcidInUrl();

var getAllCouponCodes = new Promise(function(resolve, reject) {
  $.get( "/assets/campaigns/public/esmmwl/data/codes.2016.json")
  .done(function(data) {
    var couponCodes = JSON.parse(data).codes;
    resolve(couponCodes);
  }).error(function(error) {
    reject(error);
  })
});

function lookForCcidInUrl () {
  var formatttedURLccid;
  if (window.location.search.includes('ccid')) {
    window.location.search.split('?').forEach( function(i) {
      if (i.includes('ccid')) {
        i.split('=')[1];
        formatttedURLccid = i.split('=')[i.split.length - 1];
        console.log('found ccid: ' + formatttedURLccid);
      }
    });
  }
  return formatttedURLccid;
}

function findAssociatedGroupFromCcid (couponCodes) {
  var foundGroup;
  couponCodes.forEach( function(i) {
    if (i.ccid === URLccid) {
      console.log(i.ccid + ' matches ccid found in URL');
      foundGroup = i.group;
      console.log('found group is ' + foundGroup);
    }
  });
  return foundGroup;
}

function findAssociatedCouponCodeFromCcid (couponCodes) {
  var foundCoupon;
  couponCodes.forEach( function(i) {
    if (i.ccid === URLccid) {
      foundCoupon = i.coupon;
      console.log('found coupon code is ' + foundCoupon);
    }
  });
  return foundCoupon;
}

getAllCouponCodes.then(function(couponCodes) {
  var group = findAssociatedGroupFromCcid(couponCodes);
  var coupon = findAssociatedCouponCodeFromCcid(couponCodes);
  addGroupAndCodeToMarkup(group, coupon);
  console.log(group, coupon);
}).catch(function(error) {
  console.log(error);
});

function addGroupAndCodeToMarkup (group, coupon) {
  if (coupon && group) {
    $("#coupon-code-phrase").html('<p>(Use coupon code &ldquo;<strong class="coupon-code">' + coupon + '</strong>&rdquo; to get your discount.)</p>');
    $("#employer-name-phrase").html('<h2 class="h1 font-univers-cn-bd">' + group + ' has saved a spot for you!</h2>');
    $("#coupon-code-phrase-2").html('Enter your employer\'s special coupon code <strong>' + coupon + '</strong> to waive the program\'s $235 registration fee');
  }
}
