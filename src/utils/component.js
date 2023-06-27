/*eslint-disable*/

const path = require('path');
const fs = require('fs');

const minimist = require('minimist');

const args = minimist(process.argv.slice(2), {
  alias: {
    name: 'n',
  },
});

const snakeCase = (s) => {
  return s.replace(/\.?([A-Z]+)/g, (x, y) => {
    return `-${y.toLowerCase()}`;
  });
};

const componentName = args.name;
const className = snakeCase(componentName).substring(1);

fs.mkdirSync(path.resolve(__dirname, '..', 'src', 'components', componentName));

const componentCode = `import React from 'react';
import './${componentName.toLowerCase()}.module.css';

type TProps = {};


const ${componentName}: React.FC<TProps> = (props) => {

  return <div className={styles.${className} />;
};

export default ${componentName};
`;

const styleCode = `

.${className} {
  $self: &;
}
`;

fs.writeFileSync(
  path.resolve(__dirname, '..', 'src', 'components', componentName, 'index.tsx'),
  componentCode
);

fs.writeFileSync(
  path.resolve(__dirname, '..', 'src', 'components', componentName, 'style.css'),
  styleCode
);
