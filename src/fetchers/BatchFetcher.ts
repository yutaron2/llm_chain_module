import { Fetcher } from '../interfaces/Fetcher'
import Anthropic from '@anthropic-ai/sdk';
import { apiKey } from '../config/apiKey';

export class BatchFetcher implements Fetcher {
	prompt: string
	
	constructor(prompt: string) {
			this.prompt = prompt
	}

	async fetch(): Promise<any> {
		const anthropic = new Anthropic({
			apiKey: apiKey.claude3_7
		});

		const response = await anthropic.messages.create({
			model: "claude-3-7-sonnet-20250219",
			max_tokens: 10000,
			temperature: 1,
			messages: [
				{
					role: "user",
					content: [
						{
							type: "text",
							text: this.prompt
						}
					]
				}
			]
		});
		return response;
	}
}
