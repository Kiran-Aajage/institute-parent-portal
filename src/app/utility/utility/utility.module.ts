import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from 'src/app/ui/ui.module';
import { MobileNumberPipe } from '../pipes/mobileNo.pipe';
import { DeleteThisComponent } from '../delete-this/delete-this.component';

const routes: Routes = [
    { path: 'delete-this', component: DeleteThisComponent },
];
@NgModule({
    declarations: [MobileNumberPipe],
    imports: [CommonModule, UiModule, RouterModule.forChild(routes)],

    exports: [MobileNumberPipe],
})
export class UtilityModule {}
