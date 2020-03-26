import { Injectable, NotFoundException } from "@nestjs/common";
import * as xray from 'x-ray';

import { Connection } from '../artists/connection.model';

@Injectable()
export class WhoSampledService {
  private artistConnections: Connection[] = [];
  private baseUrl: string = 'https://www.whosampled.com/search';

  private getConnectionsUrl(artistName: string): string {
    return `${this.baseUrl}/connections/?q=${encodeURIComponent(artistName)}`;
  }

  private async makeXrayRequest(
    url: string,
    selector: string,
    scope: any
  ): Promise<[]> {
    if (!url || !selector || !scope) throw new Error('Missing parameters.')
    const x = xray();
    return await x(url, selector, scope);
  }

  private async fetchArtistConnections(artistName: string) {
    const URL = this.getConnectionsUrl(artistName);
    const connections = await this.makeXrayRequest(URL, 'li.listEntry', [
      {
        link: 'a@href',
        title: '.connectionTitle a',
        image: 'img@src',
      },
    ]);

    if (!connections) throw new NotFoundException('No connections for this artist.');

    this.artistConnections = connections;
  }

  async getArtistConnections(artistName: string): Promise<any> {
    if (!artistName) throw new Error('No artist name was provided.');

    await this.fetchArtistConnections(artistName);

    return [...this.artistConnections]
  }
}