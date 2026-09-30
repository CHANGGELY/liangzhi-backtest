import path from 'path';

/**
 * 将用户/环境变量提供的路径规范化，并强制其必须位于 allowedRoot 之内，
 * 防止通过 ../ 等形式逃逸出允许的根目录（路径穿越）。
 */
function resolveWithinRoot(inputPath, allowedRoot) {
  if (typeof inputPath !== 'string' || inputPath.trim() === '') {
    throw new Error(`非法路径: ${inputPath}`);
  }
  const root = path.resolve(allowedRoot);
  const candidate = path.normalize(path.resolve(inputPath));
  const rootCmp = process.platform === 'win32' ? root.toLowerCase() : root;
  const candidateCmp = process.platform === 'win32' ? candidate.toLowerCase() : candidate;
  if (candidateCmp !== rootCmp && !candidateCmp.startsWith(rootCmp + path.sep)) {
    throw new Error(`拒绝越界路径（必须位于 ${root} 之内）: ${inputPath}`);
  }
  return candidate;
}

export { resolveWithinRoot };
