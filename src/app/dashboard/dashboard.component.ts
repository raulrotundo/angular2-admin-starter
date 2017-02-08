import { Component, OnInit } from '@angular/core';
import { BaseModalContentComponent, ModalService, ModalParams, ModalButton, ButtonType } from '../../modal';

@Component({
    moduleId: module.id,
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
        const buttons = [];
        buttons.push(new ModalButton('Hello!', ButtonType.Success));
        buttons.push(new ModalButton('Ignore', ButtonType.Default));

        const params = new ModalParams('Hello World!', HelloModalContentComponent,
            { name: this.name }, buttons, (data) => { if (data.action === 'Hello!') this.name = data.data; });
        this.modalService.show(params);
    }

    listClick() {
        const buttons = [];
        buttons.push(new ModalButton('Cool!', ButtonType.Success));
        buttons.push(new ModalButton('I don\'t think so', ButtonType.Default));
        const names: Array<string> = ['Hugo', 'Gerardo', 'Cesar', 'Jorge', 'Marcelo'];
        const params = new ModalParams('The coolest list ever!', ListModalContentComponent, { names: names }, buttons);
        this.modalService.show(params);
    }
}

@Component({
    selector: 'hello-modal-content',
    template: `Hello, <span style="font-weight: bold;">{{ name }}</span>! <br/>
                <button type="button" (click)="changeName()">Change name</button>
    `,
})
export class HelloModalContentComponent extends BaseModalContentComponent {
    public name: string = '';
    constructor() {
        super();
    }
    changeName() {
        this.name = 'María';
        this.onDataChange.emit(this.name);
    }
}

@Component({
    selector: 'list-modal-content',
    template: `<h2 *ngIf="!names || names.length == 0">No names to show</h2>
                <ul>
                    <li *ngFor="let name of names">
                        <span class="fa fa-fw fa-user"></span>{{ name }}
                    </li>
                </ul>
    `,
    styles: ['h2 { text-color: red;}']
})
export class ListModalContentComponent extends BaseModalContentComponent {
    public names: Array<string> = [];
    constructor() {
        super();

    }
}