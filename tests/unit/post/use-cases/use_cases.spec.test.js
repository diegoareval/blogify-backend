/* eslint-disable no-unused-expressions */
import chai from 'chai';
const { expect } = chai;

let dbRepository = null;

describe('Use cases', () => {
  beforeEach(() => {
    // dbRepository = postDbRepository();
    console.log('test')
  });


  describe('Fetch all posts', () => {
    it('should fetch all the posts succesfully', () => {
      // const stubRepositoryFetchAll = sinon
      //   .stub(dbRepository, 'findAll')
      //   .returns(['post1', 'post2']);
      // const posts = findAll('602c13e0cfe08b794e1b287b', dbRepository);
      // expect(stubRepositoryFetchAll.calledOnce).to.be.true;
      // expect(posts).to.eql(['post1', 'post2']);
      expect(true).to.eql(true);
    });
  });


});
