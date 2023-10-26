import { Controller, Get } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  async getCategories() {
    return 'categories';
  }
}
