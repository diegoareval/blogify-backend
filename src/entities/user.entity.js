export default function user({
                              username,
                              name,
                              email,
                              profile,
                               about,
                             role,
                              photo,
                              createdAt
                            }) {
  return {
    getName: () => name,
    getUsername: () => username,
    getEmail: ()=> email,
    getProfile: () => profile,
    getAbout: () => about,
    getRole: () => role,
    getPhoto: () => photo,
    getCreatedAt: () => createdAt
  };
}
