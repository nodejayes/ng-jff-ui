import {Component, OnDestroy, OnInit} from "@angular/core";
import {ChatBackendService, IChatMessage} from "../services/chat.backend.service";
import {BehaviorSubject} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'simple-chat',
  templateUrl: 'simple.chat.component.html',
  styleUrls: ['simple.chat.component.css']
})
export class SimpleChatComponent implements OnDestroy {
  userControl = new FormControl('');
  messageControl = new FormControl('');
  messageFrom = new FormGroup({
    user: this.userControl,
    message: this.messageControl,
  });
  messages = new BehaviorSubject<IChatMessage[]>([]);
  private messageListener = this.chatService.messageHandler.subscribe(m => this.messages.next([
    ...this.messages.getValue(), m
  ]));

  constructor(private chatService: ChatBackendService) {
  }

  ngOnDestroy(): void {
    this.messageListener?.unsubscribe();
  }

  sendMessage(): void {
    const v = this.messageFrom.getRawValue();
    console.info(v);
    this.chatService.sendMessage(v.user ?? 'unknown', v.message ?? '');
  }
}
