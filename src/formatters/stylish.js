import _ from 'lodash';

const indentSize = 4;

const makeIndent = (depth) => ' '.repeat(depth * indentSize);
const makeSignIndent = (depth) => ' '.repeat(depth * indentSize - 2);

const stringify = (value, depth) => {
  if (value === null) {
    return 'null';
  }
  if (!_.isPlainObject(value)) {
    return String(value);
  }

  const lines = Object.entries(value).map(
    ([key, val]) => `${makeIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`,
  );

  return [
    '{',
    ...lines,
    `${makeIndent(depth)}}`,
  ].join('\n');
};

const formatNode = (node, depth) => {
  const { key, type } = node;

  switch (type) {
    case 'nested': {
      const children = node.children.map((child) => formatNode(child, depth + 1));
      return [
        `${makeIndent(depth)}${key}: {`,
        ...children,
        `${makeIndent(depth)}}`,
      ].join('\n');
    }

    case 'unchanged':
      return `${makeIndent(depth)}${key}: ${stringify(node.value, depth)}`;

    case 'added':
      return `${makeSignIndent(depth)}+ ${key}: ${stringify(node.value, depth)}`;

    case 'removed':
      return `${makeSignIndent(depth)}- ${key}: ${stringify(node.value, depth)}`;

    case 'updated':
      return [
        `${makeSignIndent(depth)}- ${key}: ${stringify(node.value1, depth)}`,
        `${makeSignIndent(depth)}+ ${key}: ${stringify(node.value2, depth)}`,
      ].join('\n');

    default:
      throw new Error(`Unknown node type: ${type}`);
  }
};

export default (diffTree) => [
  '{',
  ...diffTree.map((node) => formatNode(node, 1)),
  '}',
].join('\n');
