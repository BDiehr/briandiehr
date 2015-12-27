import respLoader from './respLoader';
const MOCK_URL_PREFIX = 'mock://api';
module.exports = [
  {
    method: 'GET',
    pattern: `${MOCK_URL_PREFIX}/status`,
    fixtures: () => respLoader('status'),
  },
  {
    method: 'POST',
    pattern: `${MOCK_URL_PREFIX}/item`,
    fixtures: () => respLoader('addItem.json'),
  },
  {
    method: 'POST',
    pattern: `${MOCK_URL_PREFIX}/item/test`,
    fixtures: () => respLoader('verifyAddItem.json'),
  },
  {
    method: 'PUT',
    pattern: `${MOCK_URL_PREFIX}/item/(\\w*)`,
    fixtures: () => respLoader('modifyItem.json'),
  },
  {
    method: 'DELETE',
    pattern: `${MOCK_URL_PREFIX}/item/(\\w*)`,
    fixtures: () => respLoader('removeItem.json'),
  },
];
