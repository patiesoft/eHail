import regex from "./regex";

const validateCourseData = (courseData) => {
  const minimumNumberOfProperties = 3;
  //Validating the number of properties
  const numberOfProperties = Object.keys(courseData).length;
  if (minimumNumberOfProperties > numberOfProperties)
    return {
      status: false,
      message: "Not enough information to create a Course!",
    };
  //Validating types
  if (courseData.permissions) {
    if (!regex.course.permissions.test(courseData.permissions))
      return {
        status: false,
        message: "Permissions is wrong",
      };
  }
  if (courseData.name) {
    if (courseData.name.length < 3)
      return {
        status: false,
        message: "Name of course has to have at least three letters",
      };
  }
  return {
    status: true,
    message: "successful",
  };
};

export { validateCourseData };
