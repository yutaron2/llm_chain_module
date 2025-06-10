import { BaseController } from './BaseController';
import { ResponseService } from '../services/ResponseService';
import { PromptService } from '../services/PromptService';
import { injectable, inject } from 'inversify';
import { TYPES } from './types';

export class Service2Controller implements BaseController {
    constructor(
        @inject(TYPES.ResponseService) private responseService: ResponseService,
    	@inject(TYPES.PromptService) private promptService: PromptService
    ) {}

    async execute(): Promise<number> {
        // 実装例
        return 0;
    }
} 