import { BadRequestException, Controller, Get, Param, Query, } from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '@/infra/http/middlewares/zod-validation-pipe';
import { ListAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/list-answer-comments';
import { CommentPresenter } from '../presenters/comment-presenter'
import { CommentWithAuthorPresenter } from '../presenters/comment-with-author-presenter';

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller('/answers/:answerId/comments')
export class ListAnswerCommentsController {
  constructor(private listAnswerComments: ListAnswerCommentsUseCase) { }

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('answerId') answerId: string,
  ) {
    const result = await this.listAnswerComments.execute({
      page,
      answerId,
    });

    if (result.isError()) {
      throw new BadRequestException();
    }

    const answerComments = result.value.answerComments;

    return { comments: answerComments.map(CommentWithAuthorPresenter.toHTTP) }
  }
}