import { v4 } from 'uuid';

export type StringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

type LoggerServiceCallback = (arg: string) => void;

export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}

export function toLowerCaseWithId(arg: string) {
  return arg.toLowerCase() + v4();
}

export function calculateComplexity(stringInfo: StringInfo) {
  return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}

export function toUpperCaseWithCb(arg: string, cb: LoggerServiceCallback) {
  if (!arg) {
    cb('invalid argument!');
    return;
  }

  cb(`called dunction with ${arg}`);

  return arg.toUpperCase();
}

export class OtherStringUtils {
  public callExternalService() {
    console.log('Calling externaal service!!!');
  }

  public toUpperCase(arg: string) {
    return arg.toUpperCase();
  }

  public logString(arg: string) {
    console.log(arg);
  }
}
