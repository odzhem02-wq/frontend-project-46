import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const expectedStylish = [
  '{',
  '    common: {',
  '      + follow: false',
  '        setting1: Value 1',
  '      - setting2: 200',
  '      - setting3: true',
  '      + setting3: null',
  '      + setting4: blah blah',
  '      + setting5: {',
  '            key5: value5',
  '        }',
  '        setting6: {',
  '            doge: {',
  '              - wow: ',
  '              + wow: so much',
  '            }',
  '            key: value',
  '          + ops: vops',
  '        }',
  '    }',
  '    group1: {',
  '      - baz: bas',
  '      + baz: bars',
  '        foo: bar',
  '      - nest: {',
  '            key: value',
  '        }',
  '      + nest: str',
  '    }',
  '  - group2: {',
  '        abc: 12345',
  '        deep: {',
  '            id: 45',
  '        }',
  '    }',
  '  + group3: {',
  '        deep: {',
  '            id: {',
  '                number: 45',
  '            }',
  '        }',
  '        fee: 100500',
  '    }',
  '}',
].join('\n');

const expectedPlain = [
  "Property 'common.follow' was added with value: false",
  "Property 'common.setting2' was removed",
  "Property 'common.setting3' was updated. From true to null",
  "Property 'common.setting4' was added with value: 'blah blah'",
  "Property 'common.setting5' was added with value: [complex value]",
  "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'",
  "Property 'common.setting6.ops' was added with value: 'vops'",
  "Property 'group1.baz' was updated. From 'bas' to 'bars'",
  "Property 'group1.nest' was updated. From [complex value] to 'str'",
  "Property 'group2' was removed",
  "Property 'group3' was added with value: [complex value]",
].join('\n');

test('gendiff stylish for nested json', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'nested1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'nested2.json');

  expect(genDiff(filepath1, filepath2)).toBe(expectedStylish);
});

test('gendiff stylish for nested yaml', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'nested1.yml');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'nested2.yml');

  expect(genDiff(filepath1, filepath2)).toBe(expectedStylish);
});

test('gendiff plain for nested json', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'nested1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'nested2.json');

  expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain);
});

test('gendiff plain for nested yaml', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'nested1.yml');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'nested2.yml');

  expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain);
});

test('gendiff json for nested json', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'nested1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'nested2.json');

  const result = genDiff(filepath1, filepath2, 'json');
  expect(() => JSON.parse(result)).not.toThrow();
});

test('gendiff json for nested yaml', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'nested1.yml');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'nested2.yml');

  const result = genDiff(filepath1, filepath2, 'json');
  expect(() => JSON.parse(result)).not.toThrow();
});
