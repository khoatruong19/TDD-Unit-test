import {
  OtherStringUtils,
  calculateComplexity,
  toUpperCaseWithCb,
} from '../../app/doubles/otherUtils';
import { StringInfo } from '../../app/utils';

//stubs
describe.skip('otherUtils test suite', () => {
  it('Calculates complexity', () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: 'someInfo',
        field2: 'someOtherInfo',
      },
    };

    const actual = calculateComplexity(someInfo as any);

    expect(actual).toBe(10);
  });
  //stubs
  describe('Tracking callbacks manually', () => {
    let cbArgs = [];
    let timesCalled = 0;

    function callBackMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++;
    }

    afterEach(() => {
      cbArgs = [];
      timesCalled = 0;
    });

    it('toUpperCase - calls callback for invalid arguments', () => {
      const actual = toUpperCaseWithCb('', callBackMock);

      expect(cbArgs).toContain('invalid argument!');
      expect(timesCalled).toBe(1);
      expect(actual).toBeUndefined();
    });

    it('toUpperCase - calls callback for valid arguments', () => {
      const actual = toUpperCaseWithCb('abc', callBackMock);

      expect(cbArgs).toContain('called dunction with abc');
      expect(timesCalled).toBe(1);
      expect(actual).toBe('ABC');
    });
  });

  describe('Tracking callbacks with Jest mocks', () => {
    const callBackMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('toUpperCase - calls callback for invalid arguments', () => {
      const actual = toUpperCaseWithCb('', callBackMock);

      expect(callBackMock).toBeCalledWith('invalid argument!');
      expect(callBackMock).toBeCalledTimes(1);
      expect(actual).toBeUndefined();
    });

    it('toUpperCase - calls callback for valid arguments', () => {
      const actual = toUpperCaseWithCb('abc', callBackMock);

      expect(callBackMock).toBeCalledWith('called dunction with abc');
      expect(callBackMock).toBeCalledTimes(1);
      expect(actual).toBe('ABC');
    });
  });

  describe('OtherStringUtils tests with spies', () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test('Use a spy to track calls', () => {
      const toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase');

      sut.toUpperCase('asa');

      expect(toUpperCaseSpy).toBeCalledWith('asa');
    });

    test('Use a spy to track calls to other module', () => {
      const consoleLogSpy = jest.spyOn(console, 'log');

      sut.logString('asa');

      expect(consoleLogSpy).toBeCalledWith('asa');
    });

    test('Use a spy to replace the implementation of a method', () => {
      jest.spyOn(sut, 'callExternalService').mockImplementation(() => {
        console.log('calling mocked implementation!!!');
      });

      sut.callExternalService();
    });
  });
});
