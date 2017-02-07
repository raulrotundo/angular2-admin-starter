import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef, Injector } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
    selector: 'modal-comp',
    templateUrl: './modal.component.html',
    styles: ['.modal.fade.in { display: block; }']
})
export class ModalComponent {
    @ViewChild('modalBody', { read: ViewContainerRef }) private body: ViewContainerRef;
    public show: Boolean = false;
    public title: String = '';
    private cmp: ComponentRef<any>;

    constructor(
        modalService: ModalService,
        private componentFactoryResolver: ComponentFactoryResolver,
        injector: Injector) {

        modalService.showModal.subscribe((value: ModalParams) => {
            if (this.cmp) {
                this.cmp.destroy();
            }
            this.title = value.title;
            const factory = this.componentFactoryResolver.resolveComponentFactory(value.contentType);
            this.cmp = this.body.createComponent(factory);
            this.show = true;
        });
    }

    close() {
        this.show = false;
        if (this.cmp) {
            this.cmp.destroy();
        }
        this.cmp = null;
    }
}

export class ModalParams {
    constructor(public title: string, public contentType: any) { }
}