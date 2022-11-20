export default function postDbRepository(repository) {
  const findAll = (params) => repository.findAll(params);

  return {
    findAll
  };
}
