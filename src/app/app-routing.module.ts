import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { ApprovalViewComponent } from './approval-view/approval-view.component';
import { SummaryViewComponent } from './summary-view/summary-view.component';

const appRoutes: Routes = [
{path: 'approvals', component: ApprovalViewComponent},
{path: 'summary', component: SummaryViewComponent},
{path: '**', component: ApprovalViewComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: false})],
    exports: [RouterModule],
    providers: []
})

export class TCMRoutingModule { }