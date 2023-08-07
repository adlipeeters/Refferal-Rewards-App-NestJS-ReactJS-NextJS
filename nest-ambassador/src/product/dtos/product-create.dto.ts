import { IsEmail, IsNotEmpty } from "class-validator";

export class ProductDto {
    @IsNotEmpty()
    title?: string;

    @IsNotEmpty()
    description?: string;

    @IsNotEmpty()
    price?: number;
}