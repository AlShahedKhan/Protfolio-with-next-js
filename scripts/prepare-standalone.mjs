import { access, cp, mkdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const standaloneDir = path.join(projectRoot, '.next', 'standalone');

async function ensureExists(targetPath) {
  await access(targetPath, constants.F_OK);
}

async function copyIfPresent(sourcePath, targetPath) {
  try {
    await ensureExists(sourcePath);
  } catch {
    return;
  }

  await mkdir(path.dirname(targetPath), { recursive: true });
  await cp(sourcePath, targetPath, { recursive: true, force: true });
}

await ensureExists(standaloneDir);

await copyIfPresent(
  path.join(projectRoot, 'public'),
  path.join(standaloneDir, 'public')
);

await copyIfPresent(
  path.join(projectRoot, '.next', 'static'),
  path.join(standaloneDir, '.next', 'static')
);

console.log('Prepared standalone assets in .next/standalone');
