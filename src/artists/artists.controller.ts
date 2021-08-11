import { Controller, Get, Param } from '@nestjs/common';

import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private artService: ArtistsService) {}

  @Get([':name', ':name/:page'])
  async getArtistConnections(
    @Param('name') name: string,
    @Param('page') pageNum = '1',
  ) {
    return await this.artService.getArtistConnections(name, pageNum);
  }
}
