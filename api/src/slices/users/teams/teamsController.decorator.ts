import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

/**
 * A decorator that combines `@ApiTags()` for Swagger documentation,
 * `@ApiParam('teamId')` for proper documentation of path parameters,
 * and `@Controller()` for team-scoped API routing.
 */
export function TeamsController(resource: string) {
  return applyDecorators(
    ApiTags(resource), // Adds Swagger tag
    ApiParam({ name: 'teamId', description: 'The ID of the team', required: true }), // Adds teamId to Swagger docs
    Controller(`teams/:teamId/${resource}`), // Defines the base route
  );
}
