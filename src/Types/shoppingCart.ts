import cartItem from "./cartItem";

export default interface shoppingCart {
  id?: number;
  userId?: string;
  cartItems?: cartItem[];
  cartTotal?: number;
  stripePaymentIntentId?: any;
  clientSecret?: any;
}
