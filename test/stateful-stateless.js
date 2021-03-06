const fs = require('fs');
const path = require('path');
const proxyquire = require('proxyquire');
const test = require('ava');

const createMockApp = require('./utils/create-mock-app');
const mockMessages = require('./utils/mock-messages');
const mockPrompt = require('./utils/mock-prompt');

const eslintConfig = require('./fixtures/app/.eslintrc.json');

const template = async (t, command, answers = {}, shellArguments = []) => {
  t.plan(2);

  const runReactScript = proxyquire('../source/run-react-script', {
    '@creuna/prompt': mockPrompt.bind(null, answers),
    './messages': mockMessages
  });

  const componentName = answers.pathOrName || shellArguments[0];
  const buildPath = await createMockApp();

  const componentsPath = path.join(buildPath, 'source', 'components');
  const componentPath = path.join(
    componentsPath,
    componentName,
    `${componentName}.jsx`
  );

  await runReactScript({
    command,
    componentsPath,
    eslintConfig,
    shellArguments
  });

  t.is(fs.existsSync(componentPath), true);
  t.snapshot(fs.readFileSync(componentPath, 'utf-8'));
};

test('To stateless with prompt', template, 'stateless', {
  pathOrName: 'component-stateful'
});
test('To stateless with arguments', template, 'stateless', {}, [
  'component-stateful'
]);

test('To stateful with prompt', template, 'stateful', {
  pathOrName: 'component-stateless'
});
test('To stateful with arguments', template, 'stateful', {}, [
  'component-stateless'
]);
