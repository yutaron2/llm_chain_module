import dotenv from 'dotenv';

export function getApiKey(): string {
	dotenv.config();
	const apiKey: string = process.env.API_KEY as string;

	return apiKey;
}