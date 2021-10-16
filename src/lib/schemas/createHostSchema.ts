import { hostSchema } from './hostSchema';

const createHostSchema = {
  type: 'object',
  properties: {
    body: hostSchema
  },
  required: ['body']
};

export { createHostSchema };

export default createHostSchema;
