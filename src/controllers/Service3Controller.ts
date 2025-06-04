import { BaseController } from './BaseController';
import { Service3Param } from '../factories/ParamFactory';

export class Service3Controller implements BaseController {
    constructor(private param: Service3Param) {}

    async execute(): Promise<number> {
        // 実装例
        console.log('service 3', this.param.filePath);
        return 0;
    }
} 