import { Controller, Get, Param } from '@nestjs/common'
import { WhoSampledService } from './whosampled.service'

@Controller('artist')
export class ArtistsController {
  constructor(
    private wsService: WhoSampledService
  ) {}

  @Get(':name')
  async getArtistConnections(
    @Param('name') name: string
  ) {
    return await this.wsService.getArtistConnections(name);
  }
}