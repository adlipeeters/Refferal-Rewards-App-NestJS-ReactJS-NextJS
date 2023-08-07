import { Order } from "src/order/order";
import { Product } from "src/product/product";
import { User } from "src/user/user";
export declare class Link {
    id: number;
    code: string;
    user: User;
    products: Product[];
    orders: Order[];
}
