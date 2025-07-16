import { createParamDecorator, ExecutionContext, Inject } from '@nestjs/common';
// parse-token.pipe.ts
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from '#prisma/prisma.service';

export class ParseTokenPipe implements PipeTransform {
  // inject any dependency
  constructor(@Inject(PrismaService) private db: PrismaService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    let user;
    if (value?.email) {
      user = await this.db.user.findFirst({
        where: {
          email: {
            equals: value.email,
            mode: 'insensitive',
          },
        },
      });
    }

    if (value.userId) {
      user = await this.db.user.findFirst({
        where: { id: value.userId },
      });
    }

    if (!user) return;
    let teamId;
    const team = await this.db.team.findFirst({
      where: {
        userId: {
          equals: user.id,
          mode: 'insensitive',
        },
      },
    });

    if (team) {
      teamId = team.id
    }

    return {
      ...user,
      teamId,
    };
  }
}

export const GetToken = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  return (
    ctx.switchToHttp().getRequest().cognito_user ||
    ctx.switchToHttp().getRequest().team ||
    ctx.switchToHttp().getRequest().user
  );
});

export const User = (additionalOptions?: any) => GetToken(additionalOptions, ParseTokenPipe);
