export const validateLoginForm = (values) => {
  const errors = {};
  if (!values.get('email')) {
    errors.email = 'err';
  }
  if (!values.get('password')) {
    errors.password = 'err';
  }
  return errors;
};
