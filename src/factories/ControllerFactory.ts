import { BaseController } from '../controllers/BaseController';
import { Service1Controller } from '../controllers/Service1Controller';
import { Service2Controller } from '../controllers/Service2Controller';
import { Service3Controller } from '../controllers/Service3Controller';
import { ResponseServiceImpl } from '../services/ResponseService';
import { ControllerParam, Service1Param, Service2Param, Service3Param } from './ParamFactory';
import { PromptServiceImpl } from '../services/PromptService';

export class ControllerFactory {
	static create(param: ControllerParam): BaseController {
		const responseService = new ResponseServiceImpl();
		const promptService = new PromptServiceImpl();

		switch (param.service) {
			case 'service1':
				return new Service1Controller(param as Service1Param, responseService, promptService);
			case 'service2':
				return new Service2Controller(param as Service2Param, responseService);
			case 'service3':
				return new Service3Controller(param as Service3Param, responseService);
			default:
				throw new Error('Invalid service type. Please check the service name.');
		}	
	}
}
