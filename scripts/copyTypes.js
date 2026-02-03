const fs = require('fs/promises');
const path = require('path');

async function copyTypes() {
  const sourceDir = path.join(__dirname, '..', 'src', 'types');
  const destDir = path.join(__dirname, '..', 'dist', 'src', 'types');

  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  const typeFiles = entries.filter(
    (entry) => entry.isFile() && entry.name.endsWith('.d.ts')
  );

  await fs.mkdir(destDir, { recursive: true });

  await Promise.all(
    typeFiles.map((entry) =>
      fs.copyFile(
        path.join(sourceDir, entry.name),
        path.join(destDir, entry.name)
      )
    )
  );
}

copyTypes().catch((error) => {
  console.error('copyTypes failed:', error);
  process.exit(1);
});
