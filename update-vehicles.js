const fs = require('fs');
let code = fs.readFileSync('src/components/Vehicles.tsx', 'utf8');

code = code.replace(
  'className="bg-[#030303] pt-24 pb-12 md:pt-32 md:pb-16 relative overflow-hidden flex flex-col justify-center perspective-[2000px]"',
  'className="bg-[#000000] min-h-screen pt-32 pb-24 md:pt-48 md:pb-32 relative overflow-hidden flex flex-col justify-center perspective-[2000px]"'
);

code = code.replace(
  'transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}',
  'transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}'
);

code = code.replace(
  'transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}',
  'transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}'
);

code = code.replace(
  'className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"',
  'className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center"'
);

fs.writeFileSync('src/components/Vehicles.tsx', code);
