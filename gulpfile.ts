import { series } from 'gulp';

function clean(cb: Function) {
  cb();
}

export default series(clean);
