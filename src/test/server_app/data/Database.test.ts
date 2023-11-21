import { DataBase } from '../../../app/server_app/data/DataBase';
import * as IdGenerator from '../../../app/server_app/data/IdGenerator';

type SomeTypeWithId = {
  id: string;
  name: string;
  color: string;
};

describe('Database test suite', () => {
  let sut: DataBase<SomeTypeWithId>;

  const fakeId = '213123';

  const someObject1 = {
    id: '',
    name: 'jsdkldf',
    color: 'blue',
  };

  const someObject2 = {
    id: '',
    name: 'jsdkldfsdd',
    color: 'blue',
  };

  beforeEach(() => {
    sut = new DataBase<SomeTypeWithId>();
    jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(fakeId);
  });

  it('should return id after inset', async () => {
    const actual = await sut.insert({
      id: '',
    } as any);

    expect(actual).toBe(fakeId);
  });

  it('should return element after inset', async () => {
    const id = await sut.insert(someObject1);

    const actual = await sut.getBy('id', id);

    expect(actual).toBe(someObject1);
  });

  it('should find all elements with the same property', async () => {
    await sut.insert(someObject1);
    await sut.insert(someObject2);

    const expected = [someObject1, someObject2];

    const actual = await sut.findAllBy('color', 'blue');

    expect(actual).toEqual(expected);
  });

  it('should change the color of object', async () => {
    const id = await sut.insert(someObject1);

    const expectedColor = 'red';

    await sut.update(id, 'color', expectedColor);

    const actual = await sut.getBy('id', id);

    expect(actual.color).toEqual(expectedColor);
  });

  it('should delete the object', async () => {
    const id = await sut.insert(someObject1);

    await sut.delete(id);

    const actual = await sut.getBy('id', id);

    expect(actual).toBeUndefined();
  });
});
