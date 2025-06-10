import { BatchFetcher } from '../fetchers/BatchFetcher'
import { StreamFetcher } from '../fetchers/StreamFetcher'
import { Fetcher } from '../interfaces/Fetcher'

export class FetcherFactory {
	static create(type: 'pdf'|'text', prompt:string): Fetcher {
		if (type === 'pdf') {
			// pdfを入力する場合はstreamで受け取る必要がある
			const defaultPath = 'resources/pdf/dummy.pdf'
			return new StreamFetcher(prompt, defaultPath);
		} else {
			// textを入力する場合はbatchで受け取る必要がある（通常のリクエスト）
			return new BatchFetcher(prompt);
		}
	}
}

