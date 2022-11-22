import postController from '../../../adapters/controllers/post.controller';
import postDbRepository from '../../../application/repositories/post-db.repository';
import postDbRepositoryMongoDB from '../../database/mongo/repositories/post-mongo.repository';
import postRedisRepository from '../../../application/repositories/post-redis-repository';
import postRedisRepositoryImpl from '../../database/redis/repository/post.repository';

import redisCachingMiddleware from '../middlewares/redisCachingMiddleware';

 import authMiddleware from '../middlewares/authMiddleware';

export default function postRouter(express, redisClient) {
  const router = express.Router();

  // load controller with dependencies
  const controller = postController(
    postDbRepository,
    postDbRepositoryMongoDB,
    redisClient,
    postRedisRepository,
    postRedisRepositoryImpl
  );

  // GET endpoints
  router
    .route('/')
    .get(
      [authMiddleware, redisCachingMiddleware(redisClient, 'posts')],
      controller.fetchAllPosts
    );

  router
    .route('/:id')
    .get(
      [authMiddleware, redisCachingMiddleware(redisClient, 'post')],
      controller.fetchPostById
    );

  // POST endpoints
  router.route('/').post(authMiddleware, controller.addNewPost);

  // PUT endpoints
  router.route('/:id').put(authMiddleware, controller.updatePostById);

  // DELETE endpoints
  router.route('/:id').delete(authMiddleware, controller.deletePostById);


  return router;
}
