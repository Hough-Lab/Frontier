module.exports.validateRegisterInput = (email, username, password, confirmPassword, firstName, lastName) => {
  const errors = {};
  if (firstName.trim() === '') {
    errors.firstName = 'First name field must not be empty'
  }
  if (lastName.trim() === '') {
    errors.lasttName = 'Last name field must not be empty'
  }
  if (username.trim() === '') {
    errors.lasttName = 'Username must not be empty'
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty'
  } else {
    const regExEmail = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regExEmail)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match'
  } else {
    const regExLowercase = /^.*[a-z].*$/;
    if (!password.match(regExLowercase)) {
      errors.passwordLowerCase = 'The password must contain at least 1 lowercase alphabetical character';
    }
    const regExNumber = /^.*[0-9].*$/;
    if (!password.match(regExNumber)) {
      errors.passwordNumericCharacter = 'The password must contain at least 1 numeric character';
    }
    const regExLength = /^.{7,}$/;
    if (!password.match(regExLength)) {
      errors.passwordLength = 'The password must be eight characters or longer';
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}