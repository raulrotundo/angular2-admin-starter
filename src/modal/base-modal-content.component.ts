import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { ModalCloseEvent } from './modal.component';

@Component({
    selector: 'base-modal-content',
    template: `BaseModalContentComponent shouldn't be instantiated directly. Extend it instead`,
    styles: [':host{font-weight: bold;}']
})
export class BaseModalContentComponent {
    // note that output and input don't work when dynamically injecting a component
    @Output() public onDataChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() public data: any;
}