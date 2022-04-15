import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div class="p-message p-messages-error">
      <p-message  *ngIf="temErro()" severity="error" text="{{text}}"></p-message>
    </div>
  `,
  styles: [`
    .p-message {
      margin: 0;
      padding: 3px;
    };

  `]
})
export class MessageComponent {

  @Input() error!: string;
  @Input() control!: FormControl;
  @Input() text!: string;

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }


}
