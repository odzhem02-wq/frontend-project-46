import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const buildLines = (nodes, parentPath) => nodes.flatMap((node) => {
  const property = parentPath ? `${parentPath}.${node.key}` : node.key;

  switch (node.type) {
    case 'nested':
      return buildLines(node.children, property);

    case 'added':
      return `Property '${property}' was added with value: ${formatValue(node.value)}`;

    case 'removed':
      return `Property '${property}' was removed`;

    case 'updated':
      return `Property '${property}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`;

    case 'unchanged':
      return [];

    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
});

export default (diffTree) => buildLines(diffTree, '').join('\n');
