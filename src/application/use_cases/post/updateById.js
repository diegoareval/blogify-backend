import blog from '../../../entities/blog.entity';

export default function updateById({
                                     id,
                                     title,
                                     slug,
                                     body,
                                     excerpt,
                                     createdAt,
                                     mtitle,
                                     mdesc,
                                     photo,
                                     categories,
                                     tags,
                                     userId,
                                     postRepository
                                   }) {
  // validate
  if (!title || !body) {
    throw new Error('title and description fields are mandatory');
  }
  const updatedPost = blog({ title,slug, body,userId,excerpt,mtitle,mdesc,photo, categories,tags, createdAt });

  return postRepository.findById(id).then((foundPost) => {
    if (!foundPost) {
      throw new Error(`No post found with id: ${id}`);
    }
    return postRepository.updateById(id, updatedPost);
  });
}
