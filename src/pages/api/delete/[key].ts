import type { APIRoute } from 'astro';
import { deleteFile } from '#lib/utils/fileService';
import { verifyToken } from '#lib/utils/auth';

export const del: APIRoute = async ({ params, request }) => {
	const { key } = params;
	const url = new URL(request.url);
	const token = url.searchParams.get('token');
	const salt = url.searchParams.get('salt');

	if (!key || !token || !salt || !verifyToken(token, url.pathname, salt)) {
		return new Response('Unauthorized', { status: 401 });
	}

	try {
		await deleteFile(key);
		return new Response(JSON.stringify({ message: 'File deleted successfully' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response('Error deleting file', { status: 500 });
	}
};
