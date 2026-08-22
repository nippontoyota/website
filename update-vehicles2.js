const fs = require('fs');
let code = fs.readFileSync('src/components/Vehicles.tsx', 'utf8');

code = code.replace(
  'transition={{ duration: 1.5, ease: "easeOut" }}',
  'transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}'
);

code = code.replace(
  'transition={{ duration: 0.9, ease: [0.2, 0.9, 0.4, 1] }}',
  'transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}'
);

fs.writeFileSync('src/components/Vehicles.tsx', code);
