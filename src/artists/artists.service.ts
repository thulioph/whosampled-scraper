import { Injectable } from '@nestjs/common';

import { WhoSampledService } from '../common/whosampled.service'

@Injectable()
export class ArtistsService {
  constructor(private wsService: WhoSampledService) {}

  async getArtistConnections(name: string) {
    return await this.wsService.getArtistConnections(name);
  }
}