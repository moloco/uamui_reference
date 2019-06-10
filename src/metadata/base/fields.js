export default {
  name: {
    label: 'Name',
    type: 'text',
  },
  types: {
    text: {
      componentMap: {
        list: 'TextCell',
        edit: 'InputRow',
        detail: 'TextRow',
      },
    },
  },
};
