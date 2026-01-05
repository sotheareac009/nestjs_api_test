import { IsString, IsOptional } from 'class-validator';

export class CreateVideoDto {
    @IsString()
    id: string;

    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    channel?: string;

    @IsString()
    cover: string;

    @IsString()
    duration: string;

    @IsString()
    views: string;

    @IsString()
    url: string;
}
