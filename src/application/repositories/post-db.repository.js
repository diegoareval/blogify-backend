export default function postDbRepository(repository) {
  const findAll = (params) => repository.findAll(params);
  const countAll = (params) => repository.countAll(params);

  return {
    findAll,
    countAll
  };
}
