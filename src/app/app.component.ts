import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
    constructor(private modalService: ModalService) {

    }

    ngOnInit() {
        setTimeout(() => {
            this.modalService.showModal.next({ title: "Hello World!", contentType: MyModalContentComponent });
        }, 2000);
    }
}

@Component({
    selector: 'my-modal-test',
    template: 'Hello there!',
})
export class MyModalContentComponent {

}