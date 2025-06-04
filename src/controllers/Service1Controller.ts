import { BaseController } from './BaseController';
import { Service1Param } from '../factories/ParamFactory';
import { FetcherFactory } from '../factories/FetcherFactory';
import { prompt } from '../config/prompt';

export class Service1Controller implements BaseController {
    constructor(private param: Service1Param) {}

    async execute(): Promise<number> {
        // ベタガキでチェーンを実行
        const fetcher = FetcherFactory.create('text', prompt.TEST_CHAIN_1);
        console.log("prompt.TEST_CHAIN_1")
        console.log(prompt.TEST_CHAIN_1)
        const response_chain_1 = await fetcher.fetch();
        console.log("response_chain_1:")
        console.log(response_chain_1.content[0].text);

        
        const prompt_chain_2 = `
            # introduction
            回答(#llm_answer)を、より科学的な説明に改善してください。
            # llm_answer
            ${ response_chain_1.content[0].text }
            # output format
            ## base answer
            ${ response_chain_1.content[0].text }
            ## improved answer
            { your output here }
        `
        const fetcher2 = FetcherFactory.create('text', prompt_chain_2);
        const response_chain_2 = await fetcher2.fetch();
        console.log("response_chain_2:")
        console.log(response_chain_2.content[0].text);

        
        return 0;
    }
} 