import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ArticleService } from './article.service'; 
import { CreateArticleDTO } from '../dto/createArticle.dto';
import { Request } from 'express'; 

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
  };
}

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

  @Post()
  async create(@Body() dto: CreateArticleDTO, @Req() req: AuthenticatedRequest) {
    return await this.articleService.createArticle(dto, req.user); 
  }

  @Put(':id')
  async update(@Param() params, @Body() dto: CreateArticleDTO) {
    return await this.articleService.updateArticle(dto, params);
  }

  @Delete(':id')
  async remove(@Param() params) {
    return await this.articleService.deleteArticle(params);
  }
}