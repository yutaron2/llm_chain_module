import inquirer from "inquirer";
import { MenuOption } from "../interfaces/MenuOption";
import { ServiceType } from "../interfaces/MenuOption"

export class MenuInquierer {
  static async handleGUIInput(option: MenuOption[], type: string): Promise<string> {
    const response: { choice: string } = await inquirer.prompt({
      type: 'list',
      name: 'choice',
      message: `select ${type}`,
      choices: option,
      loop: true,
      pageSize: 10,
    });

    // 最終的にはServiceTypeを返すようにする
    const serviceType: ServiceType = response.choice as ServiceType;
    return serviceType;
  }
}
