const { buildSync } = require('esbuild');
const { join } = require('path');





buildSync({
    entryPoints: [join(__dirname, 'src/blocs.ts')],
    bundle: true,
    // minify: true,
    sourcemap: true,
    target: ['chrome70','firefox78','safari13', 'edge79'],
    outdir: join(__dirname, 'dist')
})