import { SD_Status } from "../Utulity/SD";
import shoppingCart from "./shoppingCart";

export interface orderSummaryProps {
  data: {
    id?: number;
    cartItems?: shoppingCart[];
    cartTotal?: number;
    userId?: string;
    stripePaymentIntentId?: string;
    status?: SD_Status;
  };
  userInput: {
    name?: string;
    email?: string;
    phoneNumber?: string;
  };
}
