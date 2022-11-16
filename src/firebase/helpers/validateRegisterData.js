import regex from "./regex";

const { register } = regex;

const validateRegisterData = ({ name, surname, phoneNumber }) => {
  if (!register.name.test(name)) return { status: false, message: "Bad name." };
  if (!register.name.test(surname))
    return { status: false, message: "Bad surname." };
  if (!register.phoneNumber.test(phoneNumber))
    return { status: false, message: "Bad phone number." };
  return { status: true, message: "successful" };
};

export default validateRegisterData;
