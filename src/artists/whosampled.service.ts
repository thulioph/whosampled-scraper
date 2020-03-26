import { Injectable, NotFoundException } from "@nestjs/common";
import { Connection } from './connection.model';

@Injectable()
export class WhoSampledService {
  private artistConnections: Connection[] = [];

  getArtistConnections(artistName: string): {} {
    const connection = this.artistConnections.find(
      el => el.title === artistName,
    );
    if (!connection) throw new NotFoundException('Could not find artist.');
    return { ...connection };
  }

  // should not be used
  addNewArtistConnection(artistName: string, desc: string): {} {
    const newConnection = new Connection(
      new Date().getTime().toString(),
      artistName,
      desc,
    );
    this.artistConnections.push(newConnection);
    return { ...newConnection };
  }
}