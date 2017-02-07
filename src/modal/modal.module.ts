import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';

@NgModule({
    declarations: [ModalComponent],
    imports: [BrowserModule, FormsModule],
    exports: [ModalComponent]
})
export class ModalModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ModalModule,
            providers: [
                ModalService
            ]
        };
    }
}
