import { Fetcher } from '../interfaces/Fetcher'
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs'
import { apiKey } from '../config/apiKey';

export class StreamFetcher implements Fetcher {
	prompt: string
	filePath: string
	constructor(prompt: string, filePath: string) {
    this.prompt = prompt
		this.filePath = filePath
  }

	async fetch(): Promise<any> {
		console.log("fetcher is called")
		const pdfBase64: string = fs.readFileSync(this.filePath).toString('base64');
		// pdfBase64が期待通りでなかった場合、エラーをハンドリング
		if (!pdfBase64) {
			throw new Error('pdfBase64 is not valid');
		}
		console.log("pdfBase64 is ready")
		console.log(pdfBase64)
		const anthropic = new Anthropic({
			apiKey: apiKey.claude3_7
		});
		const model = 'claude-3-7-sonnet-20250219'
		let fullResponse = ''; // 累積用の変数
		const time = new Date()
		// わかりやすいようにログを出力する
		console.log("prompt")
		console.log(this.prompt)
		await anthropic.messages.stream({
			model: model,
			max_tokens: 64000,
			messages: [
				{
					role: 'user',
					content: [
						{
							type: 'document',
							source: {
								type: 'base64',
								media_type: 'application/pdf',
								data: pdfBase64,
							},
							cache_control: { type: 'ephemeral' },
						},
						{
							type: 'text',
							text: this.prompt
						},
					],
				},
			],
		})
		.on('text', (text: string) => {
			console.log(text)
			fullResponse += text; // テキストを累積
		}).on('end', () => {
      console.log('\n💻Stream ended');
    }).done();
		console.log(fullResponse)
		return fullResponse;
	}
}
