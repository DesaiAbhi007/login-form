const notEmpty = (name, value) => {
  if (value === "") {
    return `Please enter ${name}`;
  }
  return '';
};
const checkEmail = (name, value) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/;
  if (value === "") {
    return `Please enter ${name}`;
  } else if (!emailRegex.test(value)) {
    return `Please enter a valid ${name}`;
  }
  return '';
};

const validation = (name, pattern, value) => {
  switch (pattern) {
    case "notEmpty":
      return notEmpty(name, value);
    case "checkEmail":
      return checkEmail(name, value);
    default:
      return "";
  }
};

export default validation;
