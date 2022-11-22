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

  const add = (postEntity) => {
    const newPost = new PostModel({
      title: postEntity.getTitle(),
      body: postEntity.getBody(),
      createdAt: new Date(),
      userId: postEntity.getUserId()
    });

    return newPost.save();
  };

  const updateById = (id, postEntity) => {
    const updatedPost = {
      title: postEntity.getTitle(),
      body: postEntity.getBody()
    };

    return PostModel.findOneAndUpdate(
      { _id: id },
      { $set: updatedPost },
      { new: true }
    );
  };

  const deleteById = (id) => PostModel.findByIdAndRemove(id);

  return {
    findAll,
    countAll,
    findById,
    deleteById,
    add,
    updateById,
  };
}
