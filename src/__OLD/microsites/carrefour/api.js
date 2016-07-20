import * as request from '../../../api/request';

export async function submit (baseUrl, { email }) {
  return await request.post(null, `${baseUrl}/v003/system/mail`, {
    mailTemplate: {
      reference: 'S%?Az@b+BTW+rxPhyS!*$9Zbu=cYJLfcQ9rj_4$pvBj$C@--YfLR6a&XV%82DW?J',
      source: 'system'
    },
    toAddress: email
  });
}
