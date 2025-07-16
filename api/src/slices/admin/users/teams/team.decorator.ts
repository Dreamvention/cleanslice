import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  PipeTransform,
  Inject,
} from '@nestjs/common';
import { PrismaService } from '#prisma/prisma.service';

// ✅ Step 1: Create a Pipe for Fetching the Team
@Injectable()
export class ParseTeamPipe implements PipeTransform {
  constructor(@Inject(PrismaService) private db: PrismaService) {}

  async transform(value: any) {
    if (!value) {
      throw new ForbiddenException('Team ID or Codename is required');
    }

    // Check if teamId is a UUID or codename
    const isUUID = /^team-[0-9a-fA-F-]{36}$/.test(value);

    // Fetch the team by either `id` (UUID) or `codename`
    const team = await this.db.team.findFirst({
      where: isUUID
        ? { id: value } // Search by ID
        : { codename: value }, // Search by Codename
    });

    if (!team) {
      throw new ForbiddenException(`Team ${value} does not exist`);
    }

    return team; // Return the full team object
  }
}

// ✅ Step 2: Create the `@Team()` Decorator
export const GetTeam = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().params.teamId; // Extract teamId from URL
});

export const Team = (additionalOptions?: any) => GetTeam(additionalOptions, ParseTeamPipe);
