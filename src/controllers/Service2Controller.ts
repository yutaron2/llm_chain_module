import { BaseController } from './BaseController';
import { Service2Param } from '../factories/ParamFactory';

export class Service2Controller implements BaseController {
    constructor(private param: Service2Param) {}

    async execute(): Promise<number> {
        // 実装例
        console.log('service 2:', this.param.template);
        return 0;
    }
} 