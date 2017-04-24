export const validateRegistrationForm = (values) => {
  const errors = {};
  if (!values.get('firstname') || !values.get('firstname').trim().match(/^.+$/)) {
    errors.firstname = 'err';
  }
  if (!values.get('firstname') || !values.get('firstname').trim().match(/^.+$/)) {
    errors.lastname = 'err';
  }
  if (!values.get('email') || !values.get('email').match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    errors.email = 'err';
  }
  if (!values.get('password') || !values.get('password').match(/^.{6,}$/)) {
    errors.password = 'err';
  }
  if (!values.get('terms')) {
    errors.terms = 'err';
  }
  return errors;
};
