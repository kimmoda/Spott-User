import creditcardutils from 'creditcardutils';

export const validateCardFrom = (values) => {
  const errors = {};
  if (!values.get('number')) {
    errors.number = 'err';
  } else if (!creditcardutils.validateCardNumber(values.get('number'))) {
    errors.number = 'Not valid card number';
  }
  if (!values.get('expiryMonth') || !values.get('expiryYear')) {
    errors.expiryMonth = 'err';
    errors.expiryYear = 'err';
  }
  if (values.get('expiryMonth') && values.get('expiryYear') && !creditcardutils.validateCardExpiry(values.get('expiryMonth'), values.get('expiryYear'))) {
    errors.expiryMonth = 'err';
    errors.expiryYear = 'err';
  }
  if (!values.get('cvv') || !creditcardutils.validateCardCVC(values.get('cvv'))) {
    errors.cvv = 'err';
  }
  if (!values.get('name')) {
    errors.name = 'err';
  }
  return errors;
};

export const validateAddressFrom = (values) => {
  const errors = {};
  if (!values.get('firstname')) {
    errors.firstname = 'err';
  }
  if (!values.get('lastname')) {
    errors.lastname = 'err';
  }
  if (!values.get('line1')) {
    errors.line1 = 'err';
  }
  if (!values.get('houseNumber')) {
    errors.houseNumber = 'err';
  }
  if (!values.get('city')) {
    errors.city = 'err';
  }
  if (!values.get('postcode')) {
    errors.postcode = 'err';
  }
  if (!values.get('phone')) {
    errors.line1 = 'phone';
  }
  return errors;
};

export const validateBasketForm = (values) => {
  const errors = {};
  if (!values.get('cvv') || !creditcardutils.validateCardCVC(values.get('cvv'))) {
    errors.cvv = 'err';
  }
  return errors;
};
