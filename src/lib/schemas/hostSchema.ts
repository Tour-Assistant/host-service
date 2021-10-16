export const hostSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    link: {
      type: 'object',
      properties: {
        page: {
          type: 'string'
        },
        group: {
          type: 'string'
        }
      },
      required: ['page', 'link']
    }
  },
  authorities: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        phone: {
          type: 'string'
        },
        required: ['name', 'phone']
      }
    }
  },
  required: ['name', 'link', 'authorities']
};
