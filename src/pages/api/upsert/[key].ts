import type { APIRoute } from 'astro';
import { upsertFile } from '#lib/utils/fileService';
import getBaseContentType from '#lib/utils/baseContentType';
import { verifyToken } from '#lib/utils/auth';

export const post: APIRoute = async ({ params, request }) => {
	const { key } = params;
	const url = new URL(request.url);
	const token = url.searchParams.get('token');
	const salt = url.searchParams.get('salt');

	if (!key) {
		return new Response('Bad Request: File key is required', { status: 400 });
	}
	if (!token || !salt || !verifyToken(token, url.pathname, salt)) {
		return new Response('Unauthorized', { status: 401 });
	}

	try {
		const file = await request.blob();
		const arrayBuffer = await file.arrayBuffer();
		const bunFile = Bun.file(arrayBuffer);
		const contentType = getBaseContentType(bunFile.type || 'application/octet-stream');
		const body = Buffer.from(await bunFile.arrayBuffer()); // Convert ArrayBuffer to Buffer
		await upsertFile(key, body, contentType);
		return new Response(JSON.stringify({ message: 'File uploaded successfully' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error uploading file:', error);
		return new Response('Error uploading file', { status: 500 });
	}
};
