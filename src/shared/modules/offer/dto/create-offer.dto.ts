import { Coordinates } from '../../../types/coords.type.js';
import { City, OfferType, Conveniences } from '../../../types/index.js';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsMongoId, IsNotEmptyObject, IsNumber, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.date.invalidFormat })
  public date: Date;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalidFormat })
  public city: City;

  @MaxLength(256, { message: CreateOfferValidationMessage.preview.maxLength })
  public preview: string;

  @IsArray({ message: CreateOfferValidationMessage.photos.invalidFormat })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.photos.invalidSize })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.photos.invalidSize })
  public photos: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.premium.invalidFormat })
  public premium: boolean;

  @IsBoolean({ message: CreateOfferValidationMessage.favorites.invalidFormat })
  public favorite: boolean;

  @IsNumber({ maxDecimalPlaces: 1})
  @Max(5, { message: CreateOfferValidationMessage.rating.max })
  @Min(1, { message: CreateOfferValidationMessage.rating.min })
  public rating: number;

  @IsEnum(OfferType, { message: CreateOfferValidationMessage.offerType.invalidFormat })
  public offerType: OfferType;

  @IsNumber()
  @Max(8, { message: CreateOfferValidationMessage.rooms.max })
  @Min(1, { message: CreateOfferValidationMessage.rooms.min })
  public rooms: number;

  @IsNumber()
  @Max(10, { message: CreateOfferValidationMessage.guests.max })
  @Min(1, { message: CreateOfferValidationMessage.guests.min })
  public guests: number;

  @IsNumber()
  @Max(100_000, { message: CreateOfferValidationMessage.price.max })
  @Min(100, { message: CreateOfferValidationMessage.price.min })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.conveniences.invalidType})
  @IsEnum(Conveniences, { each: true, message: CreateOfferValidationMessage.conveniences.invalidTypeElement })
  @ArrayMinSize(1, { message: CreateOfferValidationMessage.conveniences.invalidSize })
  public conveniences: Conveniences[];

  @IsMongoId({ message: CreateOfferValidationMessage.userId.invalidId })
  public userId: string;

  @IsNumber()
  public commentsCount: number;

  @IsNotEmptyObject()
  public coordinates: Coordinates;
}
