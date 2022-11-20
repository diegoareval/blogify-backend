export default function category({
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
