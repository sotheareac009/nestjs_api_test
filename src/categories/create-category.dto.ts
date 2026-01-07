import { IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    value: string;

    @IsString()
    name: string;
}
