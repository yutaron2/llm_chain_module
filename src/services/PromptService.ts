export interface PromptService {
  build(prompt: string): object
}

export class PromptServiceImpl implements PromptService {
  build(prompt: string): object {
    return {
      prompt: prompt
    };
  }
}
