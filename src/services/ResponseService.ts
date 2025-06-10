import { FetcherFactory } from "../factories/FetcherFactory"

export interface ResponseService {
  fetch(prompt: string, pdfPath?: string): Promise<any>
}

export class ResponseServiceImpl implements ResponseService {
  async fetch(prompt: string, pdfPath?: string): Promise<any> {
    const fetcher = pdfPath 
      ? FetcherFactory.create("pdf", prompt)  // steramを使うようになったらpdfPathも渡す必要がある
      : FetcherFactory.create("text", prompt);
    
    return await fetcher.fetch();  // ← これが大事！
  }
}