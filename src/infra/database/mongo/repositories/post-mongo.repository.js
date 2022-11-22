import PostModel from '../model/blog.model';

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function postRepositoryMongoDB() {
  const findAll = (params) =>
    PostModel.find(omit(params, 'page', 'perPage'))
      .skip(params.perPage * params.page - params.perPage)
      .limit(params.perPage);

  const countAll = (params) => PostModel.countDocuments(omit(params, 'page', 'perPage'));

  const findById = (id) => PostModel.findById(id);

  return {
    findAll,
    countAll,
    findById
  };
}
