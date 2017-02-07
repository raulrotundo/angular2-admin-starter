import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef, Injector } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
    selector: 'modal-comp',
    template: `
  <div class="modal fade" [class.in]="show" id="theModal" tabindex="-1" role="dialog" aria-labelledby="theModalLabel">
    <div class="modal-dialog largeWidth" role="document">
      <div class="modal-content">
        <div class="modal-header">
        <h4 class="modal-title" id="theModalLabel">{{ title }}</h4></div>
        <div class="modal-body" #modalBody>
      </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-default" data-dismiss="modal" (click)="close()">Close</button>
  </div></div></div></div>
`,
    styles: ['.modal.fade.in { display: block; }']
})
export class ModalComponent {
    @ViewChild('modalBody', { read: ViewContainerRef }) private body: ViewContainerRef;
    public show: Boolean = false;
    public title: string = "";
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