import menuItem from "./menuItem";

export default interface cartItem {
  id?: number;
  menuItemId?: number;
  menuItem?: menuItem;
  quantity?: number;
}
