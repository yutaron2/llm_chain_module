import { BatchFetcher } from '../fetchers/BatchFetcher'
import { StreamFetcher } from '../fetchers/StreamFetcher'
import { Fetcher } from '../interfaces/Fetcher'

export class FetcherFactory {
	static create(type: 'pdf'|'text', prompt:string): Fetcher {
		if (type === 'pdf') {
			console.log("stream fetcher is called")
			// pdfを入力する場合はstreamで受け取る必要がある
			return new StreamFetcher(prompt);
		} else {
			console.log("batch fetcher is called")
			// textを入力する場合はbatchで受け取る必要がある（通常のリクエスト）
			return new BatchFetcher(prompt);
		}
	}
}