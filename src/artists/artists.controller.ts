import { Controller, Get, Param } from '@nestjs/common'

import { ArtistsService } from './artists.service'

@Controller('artist')
export class ArtistsController {
  constructor(private artService: ArtistsService) {}

  @Get(':name')
  async getArtistConnections(@Param('name') name: string) {
    return await this.artService.getArtistConnections(name);
  }
}