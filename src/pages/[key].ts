import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getAndProcessFile } from '#lib/utils/fileService';
import getBaseContentType from '#lib/utils/baseContentType';
import { cast } from '#lib/utils/cast';

export const get: APIRoute = async ({ params, request }) => {
  const { key } = params;
  const url = new URL(request.url);

  if (!key) {
    return new Response('Bad Request: File key is required', { status: 400 });
  }

  const width = parseInt(url.searchParams.get('width') ?? '') ?? undefined;
  const height = parseInt(url.searchParams.get('height') ?? '') ?? undefined;
  const quality = parseInt(url.searchParams.get('quality') ?? '') ?? undefined;

  try {
    const processedFile = await getAndProcessFile(key, { width, height, quality });
    
    // Read file stats
    const stats = await fs.stat(processedFile);
    
    // Determine content type
    const contentType = getBaseContentType(path.extname(processedFile) || 'application/octet-stream');

    // Read file content
    const fileContent = await fs.readFile(processedFile);

    return new Response(fileContent, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': stats.size.toString(),
        'Cache-Control': `public, max-age=${import.meta.env.FILE_PROXY_TTL ?? 31536000}, immutable`
      }
    });
  } catch (error) {
    console.error('Error processing file:', error);
    if (cast<Error>(error).message === 'File not found') {
      return new Response('File not found', { status: 404 });
    }
    return new Response('Error processing file', { status: 500 });
  }
};