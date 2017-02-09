import { Component } from '@angular/core';
import { BaseModalContentComponent, ModalService, ModalParams, ModalButton, ButtonType } from '../../modal';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
    title = 'Dashboard';
    name = 'Hugo';

    constructor(private modalService: ModalService) {
    }

    helloClick() {
        const acceptButton: ModalButton = new ModalButton('Hello!', ButtonType.Success);
        const cancelButton: ModalButton = new ModalButton('Ignore', ButtonType.Default);
        const buttons = [acceptButton, cancelButton];

        const params = new ModalParams('Hello!', HelloModalContentComponent,
            { 'name': this.name }, buttons, (response) => { if (response.button === acceptButton) { this.name = response.data.name; } });
        this.modalService.show(params);
    }

    listClick() {
        const acceptButton: ModalButton = new ModalButton('Cool!', ButtonType.Success);
        const cancelButton: ModalButton = new ModalButton('I don\'t think so', ButtonType.Default);
        const buttons = [acceptButton, cancelButton];

        const names: Array<string> = ['Hugo', 'Gerardo', 'Cesar', 'Jorge', 'Marcelo'];
        const params = new ModalParams('The coolest list ever!', ListModalContentComponent, { 'names': names }, buttons);
        this.modalService.show(params);
    }
}

@Component({
    selector: 'hello-modal-content',
    template: `Hello, <span style="font-weight: bold;">{{ data?.name }}</span>! <br/>
                <button type="button" (click)="changeName()">Change name</button>
    `,
})
export class HelloModalContentComponent extends BaseModalContentComponent {
    constructor() {
        super();
    }

    changeName() {
        this.data.name = 'María';
        this.onDataChange.emit(this.data);
    }
}

@Component({
    selector: 'list-modal-content',
    template: `<h2 *ngIf="!data.names || data.names.length == 0">No names to show</h2>
                <ul>
                    <li *ngFor="let name of data.names">
                        <span class="fa fa-fw fa-user"></span>{{ name }}
                    </li>
                </ul>
    `,
    styles: ['h2 { color: red;}']
})
export class ListModalContentComponent extends BaseModalContentComponent {
    constructor() {
        super();

    }
}