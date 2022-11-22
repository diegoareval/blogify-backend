import UserModel from '../model/user.model';

// move it to a proper place
function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function userRepositoryMongoDB() {
  const findByProperty = (params) =>
    UserModel.find(omit(params, 'page', 'perPage'))
      .skip(params.perPage * params.page - params.perPage)
      .limit(params.perPage);

  const countAll = (params) =>
    UserModel.countDocuments(omit(params, 'page', 'perPage'));

  const findById = (id) => UserModel.findById(id).select('-password');

  const add = (userEntity) => {
    const newUser = new UserModel({
      username: userEntity.getUserName(),
      name: userEntity.getName(),
      password: userEntity.getPassword(),
      profile: userEntity.getProfile(),
      photo: userEntity.getPhoto(),
      about: userEntity.getAbout(),
      email: userEntity.getEmail(),
      role: userEntity.getRole(),
      createdAt: new Date()
    });

    return newUser.save();
  };

  return {
    findByProperty,
    countAll,
    findById,
    add
  };
}
