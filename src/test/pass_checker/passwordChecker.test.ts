import {
  PasswordChecker,
  PasswordError,
} from '../../app/pass_checker/passwordChecker';

describe('PasswordChecker test suite', () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it('Password with less than 8 characters is invalid', () => {
    const actual = sut.checkPassword('1234567');

    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordError.SHORT);
  });

  it('Password with more than 8 characters is ok', () => {
    const actual = sut.checkPassword('123456789Aa');

    expect(actual.reasons).not.toContain(PasswordError.SHORT);
  });

  it('Password with no upper case letter is invalid', () => {
    const actual = sut.checkPassword('acb');

    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordError.NO_UPPER_CASE);
  });

  it('Password with upper case letter is valid', () => {
    const actual = sut.checkPassword('asvD');

    expect(actual.reasons).not.toContain(PasswordError.NO_UPPER_CASE);
  });

  it('Password with no lower case letter is invalid', () => {
    const actual = sut.checkPassword('1234ABCD');

    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordError.NO_LOWER_CASE);
  });

  it('Password with lower case letter is valid', () => {
    const actual = sut.checkPassword('1234abCD');

    expect(actual.reasons).not.toContain(PasswordError.NO_LOWER_CASE);
  });

  it('Complex password is valid', () => {
    const actual = sut.checkPassword('1234abCD');

    expect(actual.valid).toBe(true);
    expect(actual.reasons).toHaveLength(0);
  });

  it('Admin password with no number is invalid', () => {
    const actual = sut.checkAdminPassword('abCD');

    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordError.NO_NUMBER);
  });

  it('Admin password with number is invalid', () => {
    const actual = sut.checkAdminPassword('abCD23');

    expect(actual.reasons).not.toContain(PasswordError.NO_NUMBER);
  });
});
