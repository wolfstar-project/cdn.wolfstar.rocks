import type { APIRoute } from 'astro';
import { getAndProcessFile } from '#lib/utils/fileService';
import getBaseContentType from '#lib/utils/baseContentType';
import { cast } from '#lib/utils/cast';

export const get: APIRoute = async ({ params, request }) => {
	const { key } = params;
	const url = new URL(request.url);

	if (!key) {
		return new Response('Bad Request: File key is required', { status: 400 });
	}

	const width = parseInt(url.searchParams.get('width') ?? '0');
	const height = parseInt(url.searchParams.get('height') ?? '0');
	const quality = parseInt(url.searchParams.get('quality') ?? '0');

	try {
		const processedFile = await getAndProcessFile(key, width || undefined, height || undefined, quality || undefined);

		const file = Bun.file(processedFile);
		const contentType = getBaseContentType(file.type || 'application/octet-stream');

		return new Response(file, {
			status: 200,
			headers: {
				'Content-Type': contentType,
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
