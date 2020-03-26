import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller'
import { WhoSampledService } from './whosampled.service'

@Module({
  controllers: [ArtistsController],
  providers: [WhoSampledService],
})
export class ArtistsModule {}