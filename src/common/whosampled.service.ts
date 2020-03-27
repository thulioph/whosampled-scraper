import { Injectable, NotFoundException } from '@nestjs/common';
import * as xray from 'x-ray';

import { Nodes } from './nodes.service'

@Injectable()
export class WhoSampledService {
  private baseUrl: string = 'https://www.whosampled.com/search';

  private getConnectionsUrl(artistName: string): string {
    return `${this.baseUrl}/connections/?q=${encodeURIComponent(artistName)}`;
  }

  private async makeXrayRequest(
    url: string,
    selector: string,
    scope: any,
  ): Promise<[]> {
    if (!url || !selector || !scope) throw new Error('Missing parameters.');
    const x = xray();
    return await x(url, selector, scope);
  }

  async fetchConnectionsDetails(URL: string): Promise<[]> {
    const details = await this.makeXrayRequest(URL, 'body', Nodes.detailedEntry());

    if (!details) {
      throw new NotFoundException('No connections found for this artist.');
    }

    return details;
  }

  private async fetchArtistConnections(artistName: string): Promise<[]> {
    const URL = this.getConnectionsUrl(artistName);
    const connections = await this.makeXrayRequest(URL, 'li.listEntry', Nodes.baseEntry());

    if (!connections || !connections.length) {
      throw new NotFoundException('No connections found for this artist.');
    }

    return connections;
  }

  async getArtistConnections(artistName: string): Promise<{}> {
    if (!artistName) throw new Error('No artist name was provided.');

    const connections = await this.fetchArtistConnections(artistName);

    const info = connections.map(
      async ({ link }) => await this.fetchConnectionsDetails(link)
    );

    return await Promise.all(info).then(data => data);
  }
}