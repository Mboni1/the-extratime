
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDTO } from '../dto/createArticle.dto';

@Injectable()
export class ArticleService {
  constructor(private  prisma: PrismaService) {}

  async fetchAllArticle() {
    const allArticles = await this.prisma.article.findMany({
      orderBy: [{ id: 'desc' }],
      include: { author: true, category: true },
    });

    return {
      message: 'Articles fetched successfully',
      data: allArticles,
    };
  }

  async fetchOneArticle(params) {
    const id = parseInt(params.id, 10);
    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return {
      message: 'Article found successfully',
      data: article,
    };
  }

  async createArticle(dto: CreateArticleDTO, user) {
    try {
      const newArticle = await this.prisma.article.create({
        data: {
          title: dto.title,
          content: dto.content,
          authorId: dto.authorId, // or `user.id` if you're using JWT
          categoryId: dto.categoryId,
        },
      });

      return {
        message: 'Article created successfully',
        data: newArticle,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateArticle(dto: CreateArticleDTO, params) {
    const id = parseInt(params.id, 10);

    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    try {
      const updatedArticle = await this.prisma.article.update({
        where: { id },
        data: dto,
      });

      return {
        message: 'Article updated successfully',
        data: updatedArticle,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteArticle(params) {
    const id = parseInt(params.id, 10);

    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    try {
      await this.prisma.article.delete({ where: { id } });
      return {
        message: 'Article deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

