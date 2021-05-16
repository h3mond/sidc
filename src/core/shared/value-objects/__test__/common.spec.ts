import { ID } from '../id.value-object';

describe('Common classes', () => {
  it('should validate ID', () => {
    const validId: ID = ID.generate();
    const validId2: ID = new ID('c7ceaa08-2465-4604-a9b6-cd325c2507e3'); // uuid4

    expect(validId.validate()).toBe(true);
    expect(validId2.validate()).toBe(true);

    const invalidId: ID = new ID('36660304-af15-11eb-8529-0242ac130003'); // uuid1
    const invalidId2: ID = new ID('invalid');

    expect(invalidId.validate()).toBe(false);
    expect(invalidId2.validate()).toBe(false);
  });
});
