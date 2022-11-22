import user from '../../../entities/user.entity';

export default function addUser(
  username,
  password,
  name,
  email,
  profile,
  about,
  role,
  photo,
  createdAt,
  userRepository,
  authService
) {
  // TODO: add a proper validation (consider using @hapi/joi)
  if (!username || !password || !email) {
    throw new Error('username, password and email fields cannot be empty');
  }

  const newUser = user(
    username,
    authService.encryptPassword(password),
    name,
    email,
    profile,
    about,
    role,
    photo,
    createdAt
  );

  return userRepository
    .findByProperty({ username })
    .then((userWithUsername) => {
      if (userWithUsername.length) {
        throw new Error(`User with username: ${username} already exists`);
      }
      return userRepository.findByProperty({ email });
    })
    .then((userWithEmail) => {
      if (userWithEmail.length) {
        throw new Error(`User with email: ${email} already exists`);
      }
      return userRepository.add(newUser);
    });
}
