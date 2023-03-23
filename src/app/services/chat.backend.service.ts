import {EventEmitter, Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import {BehaviorSubject} from "rxjs";
import {MessagePackHubProtocol} from "@microsoft/signalr-protocol-msgpack";

export interface IChatMessage {
  user: string;
  message: string;
}

const LOOKUP_INTERVAL = 5000;

@Injectable({ providedIn: 'root' })
export class ChatBackendService {
  private client: HubConnection;
  messageHandler = new EventEmitter<IChatMessage>();
  backendConnected$ = new BehaviorSubject<boolean>(false);

  private async startConnection(): Promise<void> {
    if (!this.client) {
      setTimeout(this.startConnection, LOOKUP_INTERVAL);
    }
    try {
      await this.client.start();
      this.backendConnected$.next(true);
    } catch (e) {
      console.log(e);
      setTimeout(this.startConnection, LOOKUP_INTERVAL);
    }
  }
  constructor() {
    this.client = new HubConnectionBuilder()
      .withUrl("/chatHub")
      .configureLogging(LogLevel.Information)
      .withHubProtocol(new MessagePackHubProtocol())
      .build();
    this.client.onclose((e) => {
      console.log('connection closed: ', e);
      this.backendConnected$.next(false);
      setTimeout(this.startConnection, LOOKUP_INTERVAL);
    });
    this.client.onreconnected((id) => {
      console.log('backend reconnected with id: ', id);
    });
    this.client.onreconnecting((e) => {
      console.log('reconnecting: ', e);
    });
    this.client.on('ReceiveMessage', (user, message) => {
      this.messageHandler.emit({user, message});
    });
    this.startConnection().then();
  }

  sendMessage(user: string, message: string): void {
    if (!this.client) {
      console.warn('missing signalr client');
      return;
    }
    this.client.invoke('SendMessage', user, message).then();
  }
}
