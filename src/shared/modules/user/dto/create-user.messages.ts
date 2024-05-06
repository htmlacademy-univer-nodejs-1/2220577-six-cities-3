export const CreateUserMessages = {
  email: {
    invalidFormat: 'email must be a valid address'
  },
  userType: {
    invalidFormat: 'must be Default or Pro'
  },
  name: {
    invalidFormat: 'name must be string',
    lengthField: 'min length is 1, max is 15',
  },
  avatar: {
    invalidFormat: 'avatar must be string',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'min length for password is 6, max is 12'
  },
} as const;
