import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Toast } from '../../interface';


@Component({
  selector: 'application-toaster',
  template: `
    <div class="toast-msg toast-{{toast.type}}" id="toast-msg">
      <p><span>{{toast.title}}</span>{{toast.body}}</p>
      <h4 (click)="onClose()">X</h4>
    </div>
    `,
  styleUrls: ['./toaster.component.scss']
})


export class ToasterComponent {

  @Input() toast: any;
  @Input() i: any;
  @Output() remove = new EventEmitter<number>();

  onClose() {
    document.getElementById("toast-msg")!.style.display = "none"
  }
}
