interface ErrorMessageFuncs {
  username: (username: string) => string;
  email: (email: string) => string;
  password: (password: string) => string;
  new_password: (new_password: string) => string;
  confirmation: (password: string, confirmation: string) => string;
}

const getErrorMessage: ErrorMessageFuncs = {
  username: (username: string) => {
    if (username.length < 3) return 'Username must be at least 3 characters long';
    return '';
  },

  email: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email address';
    return '';
  },

  password: (password: string) => {
    if (password.length < 6) return 'Password must be at least 6 characters long';
    return '';
  },

  new_password: (new_password: string) => {
    if (new_password.length < 6) return 'Password must be at least 6 characters long';
    return '';
  },

  confirmation: (password: string, confirmation: string) => {
    if (password !== confirmation) return 'Passwords do not match';
    return '';
  },
};

export { getErrorMessage };
