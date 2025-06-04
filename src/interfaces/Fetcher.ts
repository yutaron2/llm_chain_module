export interface Fetcher {
	prompt: string;
	fetch(): Promise<any>;
}