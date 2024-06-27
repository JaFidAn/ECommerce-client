import menuItem from "./menuItem";

export default interface orderDetail {
  orderDetailId?: number;
  orderHeaderId?: number;
  menuItemId?: number;
  menuItem?: menuItem;
  quantity?: number;
  itemName?: string;
  price?: number;
}
