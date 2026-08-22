const fs = require('fs');
let code = fs.readFileSync('src/components/LeadCaptureForm.tsx', 'utf8');

// Fix SALES/SERVICE toggle unselected state
code = code.replace(/text-zinc-600 hover:text-zinc-400/g, 'text-white/40 hover:text-white/80');

// Fix Placeholders
code = code.replace(/placeholder-zinc-500/g, 'placeholder-white/60');

// Fix +91 prefix opacity
code = code.replace(/text-white\/50/g, 'text-white/70');

// Fix Dropdown unselected text & arrow
code = code.replace(/text-zinc-500/g, 'text-white/60');

// Fix Dropdown list item unselected text
code = code.replace(/text-zinc-400 hover:bg-white\/5/g, 'text-white/60 hover:bg-white/10');

// Fix "Connect with our Toyota specialists today" subtitle
code = code.replace(/text-zinc-400 font-light/g, 'text-white/70 font-light');

fs.writeFileSync('src/components/LeadCaptureForm.tsx', code);
