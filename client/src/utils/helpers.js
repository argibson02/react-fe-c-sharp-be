export function validateEmail(input) {
  const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.test(String(input).toLowerCase());
}

export function validatePassword(input) {
  // Minimum of 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.
  const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  if (input.match(password)) {
    return true;
  }
  return false;
}

export function checkInputs(input) {
  const userinput = /^$/;
  if (input.match(userinput)) {
    return false;
  }
  return true;
}
