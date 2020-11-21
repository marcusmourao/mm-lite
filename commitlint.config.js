module.exports = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  rules: {
    'type-enum': [2, 'always', ['chore', 'feat', 'fix', 'release']],
  },
}
