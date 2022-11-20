export default function blog({
                               title,
                               slug,
                               body,
                               userId,
                               excerpt,
                               mtitle,
                               mdesc,
                               photo,
                               categories,
                               tags,
                                   createdAt,
                                 }) {
  return {
    getTitle: () => title,
    getSlug: () => slug,
    getBody: () => body,
    getExcerpt: () =>excerpt,
    getUserId: () => userId,
    getMTitle: ()=> mtitle,
    getPhoto: () => photo,
    getMDesc: ()=> mdesc,
    getCategories: () => categories,
    getTags: () => tags,
    getCreatedAt: () => createdAt
  };
}
