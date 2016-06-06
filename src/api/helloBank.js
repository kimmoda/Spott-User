import * as request from './_request';

export async function postHellobankAnswer (baseUrl, authenticationToken, { birthdate, productCount }) {
  return await request.post(authenticationToken, `${baseUrl}/rest/v003/user/form`, {
    definitionReference: { reference: '=k!29+V?2G&5HRMbtp@*qxgxHn5JhQ44Ps9yf^+RVg!VLT^P8_q5mz7F$5a%uuz2', source: 'system' },
    values: { birthdate, productCount }
  });
}
