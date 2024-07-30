/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly S3_ENDPOINT: string;
	readonly S3_REGION: string;
	readonly S3_BUCKET: string;
	readonly AWS_ACCESS_KEY_ID: string;
	readonly AWS_SECRET_ACCESS_KEY: string;
	readonly QUALITY: number;
	readonly TTL: number;
	readonly SECRET_KEY: string;
	readonly HOST: string;
	readonly PORT: number;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
