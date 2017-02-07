import { Subject } from 'rxjs/Subject';
import { ModalParams } from './modal.component';

export class ModalService {
    public showModal: Subject<ModalParams> = new Subject<ModalParams>();
}