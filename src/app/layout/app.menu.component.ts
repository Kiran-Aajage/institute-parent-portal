import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { StateService } from '../services/state.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private stateSvc: StateService,
        private authSvc: AuthService,
        private router: Router
    ) {
        router.canceledNavigationResolution = 'computed';
    }

    ngOnInit() {
        if (
            this.stateSvc.getUserData('accessToken') &&
            this.stateSvc.getUserData('refreshToken') &&
            this.stateSvc.getUserData('newUser')
        ) {
            this.model = [
                {
                    label: 'Home',
                    items: [
                        {
                            label: 'Dashboard',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/main/admin-dashboard'],
                        },
                    ],
                },
                {
                    // label: 'Admission Form',
                    items: [
                        {
                            label: 'Admission Form ',
                            icon: 'pi pi-fw pi-id-card',
                            routerLink: ['/main/admission'],
                        },
                        /*{
                            label: 'Delete this ',
                            icon: 'pi pi-fw pi-id-card',
                            routerLink: ['/main/utility/delete-this'],
                        },*/
                    ],
                },

                {
                    items: [
                        {
                            label: 'Student Details ',
                            icon: 'fa-solid fa-school',

                            items: [
                                {
                                    label: 'Attendance',
                                    icon: 'fa-solid fa-school',
                                    routerLink: ['/main/institute/list'],

                                },
                                {
                                    label: 'Fees',
                                    icon: 'fa fa-money-bill-transfer',
                                    routerLink: ['/main/institute/bank'],
                                },
                                {
                                    label: 'Grades and Progress',
                                    icon: 'fa-solid fa-users',
                                    routerLink: ['/main/institute/staff'],
                                },
                                {
                                    label: 'Assignments and Homework',
                                    icon: 'fa-solid fa-file-contract',
                                    routerLink: ['/main/institute/kyc'],
                                },
                                // {
                                    // label: 'Add Institute',
                                    // icon: 'fa fa-money-bill-transfer',
                                    // routerLink: ['/main/institute/add'],
                                // },

                                {
                                     label: 'School Announcements',
                                     icon: 'fa fa-money-bill-transfer',
                                     routerLink: ['/main/institute/add'],
                                },
                            ],
                        },
                    ],
                },

                /*{
                    label: 'Student',
                    items: [
                        {
                            label: 'Students ',
                            icon: 'fa-solid fa-graduation-cap',
                            routerLink: ['/main/student'],
                        },
                    ],
                },
                {
                    label: 'Collections',
                    items: [
                        // {
                        //     label: 'Charges ',
                        //     icon: 'pi pi-fw pi-id-card',
                        //     routerLink: ['/main/student'],
                        // },
                        // {
                        //     label: 'Charge group ',
                        //     icon: 'pi pi-fw pi-id-card',
                        //     routerLink: ['/student'],
                        // },
                        {
                            label: 'Collections ',
                            icon: 'pi pi-fw pi-id-card',
                            routerLink: ['/main/collection/list'],
                        },
                    ],
                },
                {
                    label: 'Reports',
                    items: [
                        {
                            label: 'Payment Summary ',
                            icon: 'pi pi-fw pi-id-card',
                            routerLink: ['/main/reporting/payment-summary'],
                        },
                    ],
                },*/
            ];
        } else {
            localStorage.clear();

            this.router.navigate(['/auth/login']);
        }
    }
}
