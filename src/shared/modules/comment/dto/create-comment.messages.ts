export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: 'min length is 5, max is 2024'
  },
  rating:{
    min: 'Min rating is 1',
    max: 'Max rating is 5'
  },
  userId: {
    invalidFormat: 'userId field must be a valid id'
  },
  offerId:{
    invalidFormat: 'offerId field must be a valid id'
  }
} as const;
