import { BaseController } from './BaseController';
import { injectable, inject } from 'inversify';
import { prompt } from '../config/prompt';
import { ResponseService } from '../services/ResponseService';
import { PromptService } from '../services/PromptService';
import { TYPES } from './types';

@injectable()
export class Service1Controller implements BaseController {

    constructor(
			// こうかけば、具象を作る前から概念的なコードを書ける！すごい！
			@inject(TYPES.ResponseService) private responseService: ResponseService,
    	@inject(TYPES.PromptService) private promptService: PromptService
		) 
		{

    }

    async execute(): Promise<number> {
        console.log('\n🚀 プロンプトチェーン処理を開始します\n');
        console.log('='.repeat(50));
        console.log('📝 チェーン1: 初期プロンプト');
        console.log('='.repeat(50));


        // const fetcher = FetcherFactory.create('text', prompt.TEST_CHAIN_1);
        console.log('\n📋 プロンプト内容:');
        console.log('-'.repeat(30));
        console.log(prompt.TEST_CHAIN_1);
        console.log('-'.repeat(30));

				const response_chain_1 = await this.responseService.fetch(prompt.TEST_CHAIN_1)
        console.log('\n✨ チェーン1の応答:');
        console.log('-'.repeat(30));
        console.log(response_chain_1.content[0].text);
        console.log('-'.repeat(30));

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

        console.log('\n' + '='.repeat(50));
        console.log('📝 チェーン2: 改善プロンプト');
        console.log('='.repeat(50));

        console.log('\n📋 プロンプト内容:');
        console.log('-'.repeat(30));
        console.log(prompt_chain_2);
        console.log('-'.repeat(30));

				const response_chain_2 = await this.responseService.fetch(prompt_chain_2)
        
        console.log('\n✨ チェーン2の応答:');
        console.log('-'.repeat(30));
        console.log(response_chain_2.content[0].text);
        console.log('-'.repeat(30));

        console.log('\n✅ プロンプトチェーン処理が完了しました\n');
        return 0;
    }
} 