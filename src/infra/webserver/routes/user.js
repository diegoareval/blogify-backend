import userController from '../../../adapters/controllers/user.controller';
import userDbRepository from '../../../application/repositories/user-db.repository';
import userDbRepositoryMongoDB from '../../database/mongo/repositories/user-mongo.repository';
import authServiceInterface from '../../../application/services/auth.service';
import authServiceImpl from '../../services/auth.service';
import authMiddleware from '../middlewares/authMiddleware';

export default function userRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const controller = userController(
    userDbRepository,
    userDbRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl
  );

  // GET enpdpoints
  router.route('/:id').get(authMiddleware, controller.fetchUserById);
  router.route('/').get(authMiddleware, controller.fetchUsersByProperty);

  // POST enpdpoints
  router.route('/').post(controller.addNewUser);

  return router;
}
