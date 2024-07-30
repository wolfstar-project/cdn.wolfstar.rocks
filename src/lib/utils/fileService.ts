import { GetObjectCommand, PutObjectCommand, HeadObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import Sharp from 'sharp';
import { s3Client } from '#lib/structures/S3Client';

export const getAndProcessFile = async (key: string, width?: number, height?: number, quality?: number) => {
	const getCommand = new GetObjectCommand({ Bucket: import.meta.env.S3_BUCKET, Key: key });
	const { Body, ContentType } = await s3Client.send(getCommand);

	if (!Body) throw new Error('File not found');

	const buffer = await Body.transformToByteArray();

	if (ContentType?.startsWith('image/')) {
		let image = Sharp(buffer);

		if (width || height) {
			image = image.resize({
				width,
				height,
				fit: 'inside',
				withoutEnlargement: true
			});
		}

		const requestedQuality = quality ?? import.meta.env.QUALITY ?? 80;
		image = image.jpeg({ quality: requestedQuality });

		return (await image.toBuffer()).toString('base64');
	} else {
		// For non-image files, return the buffer as is
		return Buffer.from(buffer).toString('utf-8');
	}
};

export async function upsertFile(key: string, body: Buffer | string, contentType: string) {
	const putCommand = new PutObjectCommand({
		Bucket: import.meta.env.S3_BUCKET,
		Key: key,
		Body: body,
		ContentType: contentType
	});
	await s3Client.send(putCommand);
}

export async function getFileInfo(key: string) {
	const headCommand = new HeadObjectCommand({
		Bucket: import.meta.env.S3_BUCKET,
		Key: key
	});
	const response = await s3Client.send(headCommand);
	return {
		contentLength: response.ContentLength,
		contentType: response.ContentType,
		lastModified: response.LastModified
	};
}

export async function deleteFile(key: string) {
	const deleteCommand = new DeleteObjectCommand({
		Bucket: import.meta.env.S3_BUCKET,
		Key: key
	});
	await s3Client.send(deleteCommand);
}
