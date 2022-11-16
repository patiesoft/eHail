const regex = {
  course: {
    permissions: /(communities|institutions|private|public)/,
  },
  register: {
    name: /^.{3,}$/,
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/,
    phoneNumber: /^(7[689][\d+]{6}|2[2-5][\d+]{6})$/,
    // dateString:
  },
  errors: {
    auth: {
      signIn: {
        user_not_found: /auth\/user-not-found/,
        wrong_password: /auth\/wrong-password/,
      },
    },
  },
};

export default regex;
