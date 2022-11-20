export default function tag({
                                   name,
                                   slug,
                                   createdAt
                                 }) {
  return {
    getName: () => name,
    getSlug: () => slug,
    getCreatedAt: () => createdAt
  };
}
