import { BaseController } from './BaseController';
import { ResponseService } from '../services/ResponseService';
import { PromptService } from '../services/PromptService';
import { injectable, inject } from 'inversify';
import { TYPES } from './types';

export class Service3Controller implements BaseController {
    constructor(
        // こうかけば、具象を作る前から概念的なコードを書ける！すごい！
        @inject(TYPES.ResponseService) private responseService: ResponseService,
        @inject(TYPES.PromptService) private promptService: PromptService
        ) 
    {

}

    async execute(): Promise<number> {
        // 実装例
        return 0;
    }
} 