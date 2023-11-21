export enum PasswordError {
  SHORT = 'Password is too short!',
  NO_UPPER_CASE = 'Upper case letter required!',
  NO_LOWER_CASE = 'Lower case letter required!',
  NO_NUMBER = 'At least one number required!',
}

export interface CheckResult {
  valid: boolean;
  reasons: PasswordError[];
}

export class PasswordChecker {
  public checkPassword(password: string): CheckResult {
    const reasons: PasswordError[] = [];
    this.checkForLength(password, reasons);
    this.checkForLowerCase(password, reasons);
    this.checkForUpperCase(password, reasons);

    return {
      valid: !!!reasons.length,
      reasons,
    };
  }

  public checkAdminPassword(password: string): CheckResult {
    const basicCheck = this.checkPassword(password);
    this.checkForNumber(password, basicCheck.reasons);

    return {
      valid: !!!basicCheck.reasons.length,
      reasons: basicCheck.reasons,
    };
  }

  private checkForNumber(password: string, reasons: PasswordError[]) {
    const hasNumber = /\d/;
    if (!hasNumber.test(password)) {
      reasons.push(PasswordError.NO_NUMBER);
    }
  }

  private checkForLength(password: string, reasons: PasswordError[]) {
    if (password.length < 8) {
      reasons.push(PasswordError.SHORT);
    }
  }

  private checkForUpperCase(password: string, reasons: PasswordError[]) {
    if (password == password.toLowerCase()) {
      reasons.push(PasswordError.NO_UPPER_CASE);
    }
  }

  private checkForLowerCase(password: string, reasons: PasswordError[]) {
    if (password == password.toUpperCase()) {
      reasons.push(PasswordError.NO_LOWER_CASE);
    }
  }
}
