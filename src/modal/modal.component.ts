import {
    Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Output,
    ReflectiveInjector, ViewChild, ViewContainerRef
} from '@angular/core';
import { ModalService } from './modal.service';

@Component({
    selector: 'modal-comp',
    templateUrl: './modal.component.html',
    styles: ['.fade.in { display: block; }']
})
export class ModalComponent {
    @ViewChild('dynamicContainer', { read: ViewContainerRef }) private container: ViewContainerRef;
    public show: Boolean = false;
    public title: String = '';
    private component: ComponentRef<any>;

    private data: any;
    public buttons: Array<ModalButton>;
    private closeCallback: (any) => void;

    constructor(private modalService: ModalService, private componentFactoryResolver: ComponentFactoryResolver) {

        modalService.onShow.subscribe((value: ModalParams) => {
            if (this.component) {
                this.component.destroy();
            }
            // TODO: this.onClose.subscribe();
            this.title = value.title;
            this.buttons = value.buttons;
            this.closeCallback = value.closeCallback;

            // Inputs need to be in the following format to be resolved properly
            const inputProviders = Object.keys(value.inputs).map((inputName) => {
                return { provide: inputName, useValue: value.inputs[inputName] };
            });
            const resolvedInputs = ReflectiveInjector.resolve(inputProviders);

            // We create an injector out of the data we want to pass down and this components injector
            const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.container.parentInjector);


            // We create a factory out of the component we want to create
            const factory = this.componentFactoryResolver.resolveComponentFactory(value.contentType);

            // We create the component using the factory and the injector
            const component = factory.create(injector);

            // this.dynamicComponentContainer.insert(component.hostView);

            // We create the component using the factory and the injector
            this.component = this.container.createComponent(factory);

            if (value.inputs) {
                // for (i = 0; i < value.inputs.length; ++i) {
                for (const input in value.inputs) {
                    if (value.inputs.hasOwnProperty(input)) {
                        this.component.instance[input] = value.inputs[input];
                    }
                }
            }

            // We could do the same as we did with inputs, but we only have the onDataChange event
            this.component.instance.onDataChange.subscribe(data => {
                this.data = data;
            });

            // We insert the component into the dom container
            // this.dynamicComponentContainer.insert(component.hostView);
            this.show = true;
        });
    }
    setButtonClass(type: string) {
        const ret = {};
        ret[type] = true;
        return ret;
    }

    close(action: string) {
        this.show = false;
        if (this.component) {
            this.component.destroy();
        }
        this.component = null;

        if (this.closeCallback) {
            this.closeCallback({ action: action, data: this.data });
        }
    }
}

export class ModalParams {
    // we don't need to explicitly handle outputs for now
    constructor(public title: string,
        public contentType: any,
        public inputs: any = null,
        public buttons: Array<ModalButton> = [new ModalButton('Accept', ButtonType.Success)],
        public closeCallback: (any) => void = null) { }
}

export class ModalButton {
    constructor(public text: string = '', public type: ButtonType = ButtonType.Default) { }
}
export abstract class ButtonType {
    public static Danger: string = 'btn-danger';
    public static Default: string = 'btn-default';
    public static Info: string = 'btn-info';
    public static Link: string = 'btn-link';
    public static Primary: string = 'btn-primary';
    public static Success: string = 'btn-success';
    public static Warning: string = 'btn-warning';
}

export class ModalCloseEvent {
    action: string; // button that was clicked
    data: any; // whatever data you need returned, if any
}