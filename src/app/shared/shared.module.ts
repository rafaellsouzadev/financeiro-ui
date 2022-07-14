import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';



@NgModule({
  declarations: [
    MessageComponent
    
  ],
  exports: [
    MessageComponent
    
  ],
  imports: [
    CommonModule,
    MessageModule,
    MessagesModule
  ]
})
export class SharedModule { }
