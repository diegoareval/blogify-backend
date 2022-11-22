import findAll from '../../application/use_cases/post/findAll';
import countAll from '../../application/use_cases/post/countAll';
import findById from '../../application/use_cases/post/findById';

export default function postController(
  postDbRepository,
  postDbRepositoryImpl,
  cachingClient,
  postCachingRepository,
  postCachingRepositoryImpl
) {
  const dbRepository = postDbRepository(postDbRepositoryImpl());
  const cachingRepository = postCachingRepository(
    postCachingRepositoryImpl()(cachingClient)
  );

  // Fetch all the posts of the logged in user
  const fetchAllPosts = (req, res, next) => {
    const params = {};
    const response = {};

    // Dynamically created query params based on endpoint params
    for (const key in req.query) {
      if (Object.prototype.hasOwnProperty.call(req.query, key)) {
        params[key] = req.query[key];
      }
    }
    // predefined query params (apart from dynamically) for pagination
    // and current logged in user
    params.page = params.page ? parseInt(params.page, 10) : 1;
    params.perPage = params.perPage ? parseInt(params.perPage, 10) : 10;
    params.userId = req.user && req.user.id || "unknown";

    findAll(params, dbRepository)
      .then((posts) => {
        response.posts = posts;
        const cachingOptions = {
          key: 'posts_',
          expireTimeSec: 30,
          data: JSON.stringify(posts)
        };
        // cache the result to redis
        cachingRepository.setCache(cachingOptions);
        return countAll(params, dbRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        response.totalPages = Math.ceil(totalItems / params.perPage);
        response.itemsPerPage = params.perPage;
        return res.json(response);
      })
      .catch((error) => next(error));
  };

  const fetchPostById = (req, res, next) => {
    findById(req.params.id, dbRepository)
      .then((post) => {
        if (!post) {
          throw new Error(`No post found with id: ${req.params.id}`);
        }
        res.json(post);
      })
      .catch((error) => next(error));
  };



  return {
    fetchAllPosts,
    fetchPostById
  };
}
