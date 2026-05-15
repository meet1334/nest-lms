import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @MinLength(10)
    name: string;

    @IsString()
    description: string;

    @IsString()
    level: string

    @IsNotEmpty()
    @IsNumber()
    price: number;

}
