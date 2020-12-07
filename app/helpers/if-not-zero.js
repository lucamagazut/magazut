import { helper } from '@ember/component/helper';

export function ifNotZero(params/*, hash*/) {
  let maybeNumber = Number(params[0]);


  return !isNaN(maybeNumber) && maybeNumber > 0;
}

export default helper(ifNotZero);
