import blog from '../../../entities/blog.entity';

export default function addPost({
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
  // TODO: add a proper validation (consider using @hapi/joi)
  if (!title || !body) {
    throw new Error('title and description fields cannot be empty');
  }

  const newPost = blog({ title,slug, body,userId,excerpt,mtitle,mdesc,photo, categories,tags, createdAt });

  return postRepository.add(newPost);
}
