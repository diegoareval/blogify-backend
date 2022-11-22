export default function user(
                              username,
                              password,
                              name,
                              email,
                              profile,
                               about,
                             role,
                              photo,
                              createdAt
                            ) {
  return {
    getName: () => name,
    getUserName: () => username,
    getPassword: () => password,
    getEmail: ()=> email,
    getProfile: () => profile,
    getAbout: () => about,
    getRole: () => role,
    getPhoto: () => photo,
    getCreatedAt: () => createdAt
  };
}
