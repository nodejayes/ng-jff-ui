import { EventEmitter, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { IBackendEvent } from '../../../../backend/src/shared/backend.event';

@Injectable({ providedIn: 'root' })
export class EventBackendService {
  private client: Socket;
  eventHandler = new EventEmitter<IBackendEvent>();

  constructor() {
    this.client = io('http://localhost:3000');
    this.client.on('connect', () => {});
    this.client.on('echo', (msg) => {
      this.eventHandler.emit(JSON.parse(msg) as IBackendEvent);
    });
    this.client.on('exception', (msg) => {});
    this.client.on('disconnect', (msg) => {});
  }
}
