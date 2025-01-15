const checkName = (name, value) => {  
  if (!value ) {
    return `Please enter ${name}`;
  }
};
const checkEmail = (name, value) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/;
  if (!value) {
    return `Please enter ${name}`;
  } else if (!emailRegex.test(value)) {
    return `Please enter a valid ${name}`;
  }
};
const checkMobileNumber = (name, value) => {
  const mobileNumberRegex = /^\+?[1-9][0-9]{10}$/
  if (!value) {
    return `Please enter ${name}`;
  } else if (!mobileNumberRegex.test(value)) {
    return `Please enter a valid ${name}`;    
  }
};

const validation = (name, pattern, value) => {
  
  switch (pattern) {
    case "checkName":      
      return checkName(name, value);
    case "checkEmail":
      return checkEmail(name, value);
    case "checkMobileNumber":
      return checkMobileNumber(name, value);
    default:
      return "";
  }
};


export default validation;
