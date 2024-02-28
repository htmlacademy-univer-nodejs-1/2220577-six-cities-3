import { City, Conveniences, Offer, OfferType, UserType } from '../../types/index.js';
import { readFileSync } from 'node:fs';
import { FileReader } from './index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, date, city, preview, photos, premium, favorite, rating, offerType, rooms, guests, price, conveniences, name, email, avatar, password, userType, commentsCount, coordinates]) => ({
        title,
        description,
        date: new Date(date),
        city: city as City,
        preview,
        photos: photos.split(';'),
        premium: premium === 'true',
        favorite: favorite === 'true',
        rating: Number.parseFloat(rating),
        offerType: offerType as OfferType,
        rooms: Number.parseInt(rooms, 10),
        guests: Number.parseInt(guests, 10),
        price: Number.parseInt(price, 10),
        conveniences: conveniences.split(';').map((convenienent) => convenienent as Conveniences),
        creator: { name,
          email,
          avatar,
          password,
          userType: userType as UserType },
        commentsCount: Number.parseInt(commentsCount, 10),
        coordinates: {
          latitude: Number.parseFloat(coordinates.split(';')[0]),
          longitude: Number.parseFloat(coordinates.split(';')[1])
        }
      }));
  }
}
