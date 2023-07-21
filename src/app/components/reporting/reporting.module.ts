import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentSummaryComponent } from './payment-summary/payment-summary.component';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '../../ui/ui.module';

const routes: Routes = [
    { path: 'payment-summary', component: PaymentSummaryComponent },
];
@NgModule({
    declarations: [PaymentSummaryComponent],
    imports: [CommonModule, UiModule, RouterModule.forChild(routes)],
})
export class ReportingModule {}
