import type { APIRoute } from 'astro';
import { getFileInfo } from '#lib/utils/fileService';
import { verifyToken } from '#lib/utils/auth';

export const head: APIRoute = async ({ params, request }) => {
	const { key } = params;
	const url = new URL(request.url);
	const token = url.searchParams.get('token');
	const salt = url.searchParams.get('salt');

	if (!key || !token || !salt || !verifyToken(token, url.pathname, salt)) {
		return new Response('Unauthorized', { status: 401 });
	}

	try {
		const info = await getFileInfo(key);
		return new Response(null, {
			status: 200,
			headers: {
				'Content-Type': info.contentType || 'application/octet-stream',
				'Content-Length': info.contentLength?.toString() || '0',
				'Last-Modified': info.lastModified?.toUTCString() || ''
			}
		});
	} catch (error) {
		return new Response('File not found', { status: 404 });
	}
};
