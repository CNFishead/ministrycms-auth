export const getPrice = (
  features: any[],
  options?: {
    noCredits?: boolean;
  }
) => {
  var price = features.reduce((acc, feature) => {
    return acc + feature.price;
  }, 0);

  //TODO add coupon code
  return price.toFixed(2);
};
