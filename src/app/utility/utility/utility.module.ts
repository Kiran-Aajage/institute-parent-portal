import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from 'src/app/ui/ui.module';
import { MobileNumberPipe } from '../pipes/mobileNo.pipe';
//import { DeleteThisComponent } from '../delete-this/delete-this.component';


@NgModule({
    declarations: [MobileNumberPipe],
    

    exports: [MobileNumberPipe],
})
export class UtilityModule {}
