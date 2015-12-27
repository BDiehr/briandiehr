import request from 'superagent';
// import superAgentMock from 'superagent-mock';
// superAgentMock(request, require('../../test/mock/superagent-mock-config.js'));
export default require('superagent-promise')(request, Promise);
