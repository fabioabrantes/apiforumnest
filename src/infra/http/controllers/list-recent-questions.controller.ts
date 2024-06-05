import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/middlewares/zod-validation-pipe';
import { z } from 'zod';

import { ListRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/list-recent-questions';
import { QuestionPresenter } from '../presenters/question-presenter';

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchemaType = z.infer<typeof pageQueryParamSchema>;

@Controller('/questions')
export class ListRecentQuestionsController {
  constructor(private listRecentQuestionsUseCase: ListRecentQuestionsUseCase) { }

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchemaType) {
    const result = await this.listRecentQuestionsUseCase.execute({ page, });

    if (result.isError()) {
      throw new BadRequestException();
    }

    const questions = result.value.questions;

    return { questions: questions.map(QuestionPresenter.formatQuestionsToHTTP) }
  }
}