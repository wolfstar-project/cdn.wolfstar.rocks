import crypto from 'crypto';

export function generateToken(path: string, salt: string): string {
	const hmac = crypto.createHmac('sha256', import.meta.env.SECRET_KEY);
	hmac.update(salt + path);
	return hmac.digest('hex');
}

export function verifyToken(token: string, path: string, salt: string): boolean {
	const expectedToken = generateToken(path, salt);
	return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expectedToken));
}
