export default (mimeType: string) => {
	return mimeType.split(';')[0].trim();
};
