import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getVersions(): Promise<string[]> {
  if (typeof window === 'undefined') {
    // Chỉ import các module này khi chạy trên server
    const path = await import('path');
    const fs = await import('fs/promises');

    const docsDir = path.join(process.cwd(), 'pages', 'docs');
    try {
      const files = await fs.readdir(docsDir);
      const directories = await Promise.all(
        files.map(async (file) => {
          const fullPath = path.join(docsDir, file);
          const stat = await fs.stat(fullPath);
          return { name: file, isDirectory: stat.isDirectory() };
        })
      );

      return directories
        .filter(dir => dir.isDirectory && dir.name !== 'latest')
        .map(dir => dir.name)
        .sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' }));
    } catch (error) {
      console.error('Error reading docs directory:', error);
      return [];
    }
  }
  return []; // Trả về mảng rỗng nếu đang chạy trên client
}
