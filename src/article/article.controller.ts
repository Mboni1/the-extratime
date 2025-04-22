import { Controller, Get, Param, } from '@nestjs/common';
import { ArticleService } from './article.service'; 


@Controller('article')
export class ArticleController {
  constructor(private  articleService: ArticleService) {}

  @Get()
  async findAll() {
    return await this.articleService.fetchAllArticle();
  }

  @Get(':id')
  async findOne(@Param() params) {
    return await this.articleService.fetchOneArticle(params);
  }
}