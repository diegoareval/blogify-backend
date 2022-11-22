export default function postDbRepository(repository) {
  const findAll = (params) => repository.findAll(params);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);

  return {
    findAll,
    countAll,
    findById
  };
}
