export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  date: {
    invalidFormat: 'date must be a valid ISO date',
  },
  city: {
    invalidFormat: 'must be one of Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf',
  },
  preview: {
    maxLength: 'Too short for field preview',
  },
  photos: {
    invalidFormat: 'Field photos must be an array',
    invalidSize: 'Photos must be 6 elements'
  },
  premium: {
    invalidFormat: 'Field premium must be a boolean',
  },
  favorites: {
    invalidFormat: 'Field favorites must be a boolean',
  },
  rating: {
    min: 'Min value is 1',
    max: 'Max value is 5'
  },
  offerType: {
    invalidFormat: 'must be one of apartment, house, room, hotel',
  },
  rooms: {
    min: 'Min value is 1',
    max: 'Max value is 8'
  },
  guests: {
    min: 'Min value is 1',
    max: 'Max value is 10'
  },
  price: {
    min: 'Min value is 100',
    max: 'Max value is 100 000'
  },
  conveniences: {
    invalidSize: 'Must be at least one element',
    invalidType: 'Field conveniences must be array of conveniences',
    invalidTypeElement: 'Element must be Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge'
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  }
} as const;
