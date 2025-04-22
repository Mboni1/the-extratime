
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}

