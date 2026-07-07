import * as migration_20260707_202001_init from './20260707_202001_init';

export const migrations = [
  {
    up: migration_20260707_202001_init.up,
    down: migration_20260707_202001_init.down,
    name: '20260707_202001_init'
  },
];
