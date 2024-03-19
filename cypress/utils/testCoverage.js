const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { readFile } = require('fs').promises;

const componentList = ['total', 'Login', 'Header', 'SearchBar', 'Footer', 'Recipes', 'RecipeDetails', 'RecipeInProgress', 'DoneRecipes', 'FavoriteRecipes', 'Profile'];

let coverageResult;
let runnerId;

const roundPct = (total, covered) => !total ? 0 : !covered ? 100 : Math.round((covered / total) * 10000) / 100;

const extractValues = (value) => {
  const total = Object.keys(value).length;
  const covered = Object.values(value)
    .filter((v) => Array.isArray(v)
      ? v.every((v) => v > 0)
      : v > 0)
    .length;
  const pct = roundPct(total, covered);
  return {
    total,
    covered,
    pct
  }
}

const sumTotal = (
  acc = {
    total: 0,
    covered: 0,
  },
  value
) => ({
  total: acc.total + value.total,
  covered: acc.covered + value.covered,
});


const extractCoverage = (data) => {
  const coverage = Object.entries(data)
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key]: {
        functions: extractValues(value.f),
        statements: extractValues(value.s),
        branches: extractValues(value.b),
      }
    }), {});

  const total = Object.values(coverage).reduce(({ functions, statements, branches }, value) => ({
    functions: sumTotal(functions, value.functions),
    statements: sumTotal(statements, value.statements),
    branches: sumTotal(branches, value.branches),
  }), {});

  total.functions.pct = roundPct(total.functions.total, total.functions.covered);
  total.statements.pct = roundPct(total.statements.total, total.statements.covered);
  total.branches.pct = roundPct(total.branches.total, total.branches.covered);

  return {
    ...coverage,
    total,
  }
};

const serializeCoverage = (data) => Object.keys(data).reduce((acc, fileName) => {
  const componentName = componentList.find((key) => fileName.match(`(/|\\\\)${key}((/|\\\\)index)?\.(ts|js)x?$`));
  const entry = fileName === 'total' ? fileName : componentName;

  if (!entry) return acc;

  if (acc[entry]) {
    throw new Error(`Mais de um arquivo ou pasta possui "${entry}" em seu nome`)
  }

  acc[entry] = data[fileName];

  return acc;
}, {});

const testCoverage = async (id) => {
  await exec('npm run cy-coverage ./src');
  const dataSerialized = await readFile('coverage/coverage-final.json', 'utf-8')
    .then(JSON.parse)
    .then(extractCoverage)
    .then(serializeCoverage)
  coverageResult = dataSerialized;
  runnerId = id;
  return coverageResult;
};

const getCoverage = (id) => id === runnerId ? coverageResult : testCoverage(id);

module.exports = {
  getCoverage
}
