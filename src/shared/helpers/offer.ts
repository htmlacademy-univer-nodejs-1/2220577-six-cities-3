import { City, Conveniences, Offer, OfferType, UserType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    date,
    city,
    preview,
    photos,
    premium,
    favorite,
    rating,
    offerType,
    rooms,
    guests,
    price,
    conveniences,
    name,
    email,
    avatar,
    userType,
    commentsCount,
    coordinates,
  ] = offerData.replace('\n', '').split('\t');

  return {
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
      userType: userType as UserType },
    commentsCount: Number.parseInt(commentsCount, 10),
    coordinates: {
      latitude: Number.parseFloat(coordinates.split(';')[0]),
      longitude: Number.parseFloat(coordinates.split(';')[1])
    }
  };
}
