import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { Toast } from '../../interface';

import { ToasterService } from '../../service'

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-toaster-container',
  template: `
  <ng-container *ngFor="let toast of toasts; let i=index">
    <application-toaster
      [toast]="toast" [i]="i"
      (remove)="remove($event)">
    </application-toaster>
  </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToasterContainerComponent implements OnInit, OnDestroy {

  toasts: Toast[] = [];
  _destroy = new Subject();

  constructor (
    public toaster: ToasterService,
    private _cdRef: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this._destroy.next('');
    this._destroy.complete();
  }

  ngOnInit() {
    this.toaster.toast$.pipe(takeUntil(this._destroy))
      .subscribe(toast => {
        this.toasts = [toast, ...this.toasts];
        this._cdRef.detectChanges();
        setTimeout(() => {
          this.toasts.pop();
          this._cdRef.detectChanges()
        }, toast.delay || 3000);
      });
  }

  remove(index: number) {
    this.toasts = this.toasts.filter((v, i) => i !== index);
  }


}
