import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller'
import { ArtistsService } from './artists.service'
import { WhoSampledService } from '../common/whosampled.service'

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, WhoSampledService],
})
export class ArtistsModule {}