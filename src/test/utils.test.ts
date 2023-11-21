import { StringUtils, getStringInfo, toUpperCase } from '../app/utils';

describe('Utils test suite', () => {
  describe('StringUtils tests', () => {
    let sut: StringUtils;

    beforeEach(() => {
      sut = new StringUtils();
    });

    it('should return correct upperCase', () => {
      const actual = sut.toUpperCase('abc');

      expect(actual).toBe('ABC');
    });

    it('should throw error on invalid argument - function', () => {
      function expectError() {
        const actual = sut.toUpperCase('');
      }

      expect(expectError).toThrow();
      expect(expectError).toThrowError('Invalid argument!');
    });

    it('should throw error on invalid argument - arrow function', () => {
      expect(() => sut.toUpperCase('')).toThrowError('Invalid argument!');
    });

    it('should throw error on invalid argument - try catch block', (done) => {
      try {
        sut.toUpperCase('');
        done('getStringInfo should throw error!');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'Invalid argument!');
        done();
      }
    });
  });

  it('should return uppercase', () => {
    //arrange
    const sut = toUpperCase;
    const expected = 'ABC';

    //act
    const actual = sut('abc');

    //assert
    expect(actual).toBe(expected);
  });

  describe('ToUpperCase examples', () => {
    it.each([
      {
        input: 'abc',
        expected: 'ABC',
      },
      {
        input: 'My-String',
        expected: 'MY-STRING',
      },
    ])('$input toUpperCase should be $expected', ({ input, expected }) => {
      const actual = toUpperCase(input);

      expect(actual).toBe(expected);
    });
  });

  describe('getStringInfo for My-String should', () => {
    test('return right length', () => {
      const actual = getStringInfo('My-String');
      expect(actual.characters).toHaveLength(9);
    });
    test('return right lower case', () => {
      const actual = getStringInfo('My-String');
      expect(actual.lowerCase).toBe('my-string');
    });
    test('return right upper case', () => {
      const actual = getStringInfo('My-String');
      expect(actual.upperCase).toBe('MY-STRING');
    });
    test('return right characters', () => {
      const actual = getStringInfo('My-String');
      expect(actual.characters).toEqual<string[]>([
        'M',
        'y',
        '-',
        'S',
        't',
        'r',
        'i',
        'n',
        'g',
      ]); //ordering
      expect(actual.characters).toEqual<string[]>(
        expect.arrayContaining(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g'])
      ); //unordering
      expect(actual.characters).toContain<string>('M');
    });
    test('return defined extra info', () => {
      const actual = getStringInfo('My-String');
      expect(actual.extraInfo).toBeDefined();
    });
    test('return right extra info', () => {
      const actual = getStringInfo('My-String');
      expect(actual.extraInfo).toEqual({});
    });
  });
});
