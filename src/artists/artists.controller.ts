import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { WhoSampledService } from './whosampled.service'

@Controller('artist')
export class ArtistsController {
  constructor(
    private wsService: WhoSampledService
  ) {}

  @Get(':name')
  getArtistConnections(@Param('name') name: string) {
    return this.wsService.getArtistConnections(name);
  }

  // should not be used
  @Post()
  addNewArtistConnection(
    @Body('title') title: string,
    @Body('description') desc: string
  ) {
    return this.wsService.addNewArtistConnection(title, desc)
  }
}