import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CurrentUser } from '@/auth/current-user-decorator';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { UserPayload } from '@/auth/jwt.strategy';
import { ZodValidationPipe } from '@/middlewares/zod-validation-pipe';
import { PrismaService } from '@/prisma/prisma.service';
import { z } from 'zod';

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});
const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);
type CreateQuestionBodySchemaType = z.infer<typeof createQuestionBodySchema>;

@Controller('/questions')
export class CreateQuestionController {
  constructor(private prisma: PrismaService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateQuestionBodySchemaType, @CurrentUser() user: UserPayload) {
    const { title, content } = body;
    const userId = user.sub;
    console.log(title)
    const slug = this.convertToSlug(title)

    await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug,
      },
    })

  }

  private convertToSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }
}