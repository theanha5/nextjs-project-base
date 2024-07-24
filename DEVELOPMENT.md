# NOTES FOR DEV

## Lint your code
- Order file (module) imports by it's scope - from external to internal
- Please make sure you all set up husky i.e: if when committing code, you will see lint-staged commands running, if not, you missed husky setup probably
- Comply with [commitlint's commit rules](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#rules)

## Env settings

When adding new env variable, you need to do:
- Update file `.env.example` with your new configs.
- Update you local env file. i.e: `.env.local`.
- Adding to `src/.env.mjs` file: schema & environment your config is belong to.

## Router settings

- Define path(s) corresponding to your page created.
- Please use hooks & routes params from file `src/routes.ts` for type-safety. Refer to it to see how to use.
