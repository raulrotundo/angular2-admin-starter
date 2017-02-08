import { Subject } from 'rxjs/Subject';
import { ModalParams } from './modal.component';

export class ModalService {
    public onShow: Subject<ModalParams> = new Subject<ModalParams>();

    public show(params: ModalParams) {
        this.onShow.next(params);
    }
}