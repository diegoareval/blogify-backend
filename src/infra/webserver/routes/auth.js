import authController from '../../../adapters/controllers/auth.controller';
import userDbRepository from '../../../application/repositories/user-db.repository';
import userDbRepositoryMongoDB from '../../database/mongo/repositories/user-mongo.repository';
import authServiceInterface from '../../../application/services/auth.service';
import authServiceImpl from '../../services/auth.service';

export default function authRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const controller = authController(
    userDbRepository,
    userDbRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl
  );

  // POST enpdpoints
  router.route('/').post(controller.loginUser);

  return router;
}
