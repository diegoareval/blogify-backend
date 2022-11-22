export default function login(email, password, userRepository, authService) {
  if (!email || !password) {
    const error = new Error('email and password fields cannot be empty');
    error.statusCode = 401;
    throw error;
  }
  return userRepository.findByProperty({ email }).then((user) => {
    console.log("here", user)
    if (!user.length) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }
  console.log(`password: ${password} encryptPassword: ${authService.encryptPassword(password)}, password test: ${user[0].password}`)
    const isMatch = authService.compare(password, user[0].password);
    if (!isMatch) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }
    const payload = {
      user: {
        id: user[0].id
      }
    };
    return authService.generateToken(payload);
  });
}
