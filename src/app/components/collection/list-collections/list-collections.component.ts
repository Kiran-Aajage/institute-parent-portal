import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { CollectionService } from 'src/app/services/collection.service';
import { StateService } from 'src/app/services/state.service';

import {
    ConfirmationService,
    MessageService,
    ConfirmEventType,
} from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-list-collections',
    templateUrl: './list-collections.component.html',
    styleUrls: ['./list-collections.component.scss'],
    providers: [ConfirmationService, DialogService],
})
export class ListCollectionsComponent implements OnInit, OnDestroy {
    collection!: FormGroup;
    collectionData: any[] = [];
    schoolId: any;
    items: any;
    showCollapse = false;
    myMembers: any = [];
    selectedMembers = [
        { userId: 'ba5da55bcfff74218e64' },
        { userId: '690efd28bda26d747c23' },
    ];

    selectedCollection: any;
    visible: boolean = false;

    private dataSubscription!: Subscription;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private collSvc: CollectionService,
        private stateSvc: StateService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.schoolId = this.stateSvc.getUserData('schoolId');

        this.fetchCollections();

        this.dataSubscription = this.stateSvc
            .getData()
            .subscribe((response: any) => {
                console.log('ins--->', response);
                this.fetchCollections();
            });

        this.collection = this.fb.group({
            name: ['', Validators.required],
            raisingDay: ['', Validators.required],
            frequency: ['', Validators.required],
        });
    }

    async fetchCollections() {
        this.schoolId = this.stateSvc.getUserData('schoolId');

        await this.collSvc.listCollections(this.schoolId).then((res: any) => {
            console.log(res);

            if (res.length > 0) {
                this.collectionData = res.map((item: any) => item.collection);
                console.log(this.collectionData);
            } else {
                this.collectionData = [];
            }
        });
    }

    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
    }
    handleClick(id: any) {
        console.log(id);

        this.items = [
            {
                label: 'Add New User',
                icon: 'pi pi-pencil',
                routerLink: ['/main/collection/add'],
                queryParams: { collectionId: id },
                queryParamsHandling: 'merge',
            },
            {
                label: 'Raise',
                icon: 'pi pi-bell',
                command: () => {},
            },
            {
                label: 'Disable',
                icon: 'pi pi-trash',
                command: () => {},
            },
        ];
    }

    showMembersAndCharges(id: any) {
        this.selectedCollection = id;
        this.showCollapse = !this.showCollapse;

        if (this.showCollapse) {
            this.collSvc.getMembersbyCollectionId(id).then((res: any) => {
                this.myMembers = res.members.map((el: any) => {
                    return {
                        fullName: el.members.fullName,
                        mobileNo: el.members.mobileNo,
                        email: el.members.email,
                        userId: el.members.userId,
                        balance: el.members.balance,
                        charges: el.charges,
                    };
                });
                console.log(this.myMembers);
            });
        } else {
            this.myMembers = [];
        }
    }

    sendNotification(id: any, name: any) {
        console.log(id);
        this.confirm(id, name);
    }

    confirm(id: any, name: any) {
        this.confirmationService.confirm({
            message: `Are you sure that you want to raise this collection ${name}?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'Raising...',
                });

                await this.collSvc.raiseCollection(id).then((res: any) => {
                    console.log(res);

                    if (res.status) {
                        this.messageService.add({
                            severity: 'info',
                            summary: 'Confirmed',
                            detail: 'Raised Sucessfully',
                        });
                    }
                });
            },
            reject: () => {},
        });
    }
    submit() {
        console.log(this.collection.value);
    }

    addNewUser() {
        console.log(this.selectedCollection);
    }

    addCollection() {
        this.router.navigate(['main/collection/add']);
    }
    blockedPanel: boolean = false;
}
