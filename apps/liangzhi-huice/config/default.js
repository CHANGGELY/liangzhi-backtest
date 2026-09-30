import path from 'path';
import { fileURLToPath } from 'url';
import { resolveWithinRoot } from './pathGuard.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');
const backtestDataDir = path.resolve(repoRoot, 'services', 'backtest-engine');
const defaultH5Path = path.resolve(backtestDataDir, 'ethusdt_1m_2019-11-01_to_2025-06-15.h5');
const defaultBackupPath = path.resolve(backtestDataDir, 'ETHUSDT_1m_2025-08-09_to_2025-08-09_complete.h5');

// 环境变量提供的 H5 路径需校验在仓库根目录内，防止路径穿越
const resolveConfiguredH5Path = (envValue, fallback) =>
  envValue ? resolveWithinRoot(envValue, repoRoot) : fallback;

export const DEFAULT_CONFIG = {
  backtest: {
    defaultEndMonthsBack: 3,
    maxConcurrentBacktests: 5,
    timeoutMinutes: 30
  },
  data: {
    h5FilePath: resolveConfiguredH5Path(process.env.H5_FILE_PATH, defaultH5Path),
    h5BackupPath: resolveConfiguredH5Path(process.env.H5_BACKUP_PATH || process.env.H5_FILE_PATH, defaultBackupPath),
    cacheSize: 1000,
    expectedColumns: ['timestamp', 'open', 'high', 'low', 'close', 'volume']
  },
  server: {
    port: parseInt(process.env.PORT || '8001'),
    cors: {
      origin: ['http://localhost:5173', 'http://localhost:3000'],
      credentials: true
    }
  }
};
