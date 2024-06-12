import { BadRequestException, Controller, Get, Param, Query, } from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/middlewares/zod-validation-pipe';
import { z } from 'zod';
import { ListAnswerByQuestionUseCase } from '@/domain/forum/application/use-cases/list-answer-by-question';
import { AnswerPresenter } from '../presenters/answer-presenter';

const pageQueryParamSchema = z.string().optional().default('1').transform(Number).pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchemaType = z.infer<typeof pageQueryParamSchema>;

@Controller('/questions/:questionId/answers')
export class ListQuestionAnswersController {
  constructor(private listQuestionAnswers: ListAnswerByQuestionUseCase) { }

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchemaType,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.listQuestionAnswers.execute({ page, questionId, });

    if (result.isError()) {
      throw new BadRequestException();
    }

    const answers = result.value.answers;

    return { answers: answers.map(AnswerPresenter.toHTTP) }
  }
}