import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ArticleModule, PrismaModule],
})
export class AppModule {}
