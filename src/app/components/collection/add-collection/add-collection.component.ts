import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AddChargeComponent } from '../add-charge/add-charge.component';
import { Student } from 'src/app/models/student.model';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import { StateService } from 'src/app/services/state.service';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
    selector: 'app-add-collection',
    templateUrl: './add-collection.component.html',
    styleUrls: ['./add-collection.component.scss'],
    providers: [DialogService, MessageService],
})
export class AddCollectionComponent implements OnInit, OnDestroy {
    collection!: FormGroup;
    ref: DynamicDialogRef | undefined;
    students: Student[] = [];
    checked: boolean = false;
    recurringValue!: boolean;
    myCharge: any[] = [];
    checkedStudentValue: any;
    studentObj!: any[];
    rasieSource!: any[];
    checkboxValue = false;

    selectedCities!: any[];
    myMembers: any = [];

    schoolId: any;
    collId: any;
    showAddNewUser = false;
    constructor(
        private fb: FormBuilder,
        public dialogService: DialogService,
        public messageService: MessageService,
        private router: Router,
        private stateSvc: StateService,
        private collSvc: CollectionService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.collId = this.route.snapshot.queryParamMap.get('collectionId');
        if (this.collId && this.collId.length > 0) {
            this.showAddNewUser = true;
        }

        this.schoolId = this.stateSvc.getUserData('schoolId');

        this.collection = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            source: ['', Validators.required],
            vpa: ['', Validators.required],
            freq: ['', Validators.required],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
            raisingDate: ['', Validators.required],
            invoiceDate: ['', Validators.required],
            dueDate: ['', Validators.required],
            autoRaising: [false, Validators.required],
        });
        const storedData = localStorage.getItem('myChargeData');
        if (storedData) {
            this.myCharge = JSON.parse(storedData);
        } else {
            this.myCharge = []; // Initialize the array if no data is found
        }
        this.rasieSource = [
            { name: 'WHATSAPP', code: 'Whatsapp' },
            { name: 'EMAIL', code: 'Email' },
            { name: 'SMS', code: 'SMS' },
        ];

        this.getMembersbyCollectionId();
    }

    getMembersbyCollectionId() {
        this.collSvc.getMembersbyCollectionId(this.collId).then((res: any) => {
            this.myMembers = res.members.map((members: any) => {
                console.log(members.members);
                return {
                    fullName: members.members.fullName,
                    mobileNo: members.members.mobileNo,
                    email: members.members.email,
                    userId: members.members.uniqueId,
                    balance: '1000',
                };
            });
            console.log(this.myMembers);
        });
    }
    checkboxfn() {
        this.checkboxValue = this.collection.value.autoRaising;
        // console.log('checkboxValue:', checkboxValue);
        const booleanValue = this.checkboxValue === true; // Convert to boolean
        console.log('booleanValue:', booleanValue);
        this.recurringValue = booleanValue;

        // console.log(this.collection.value.autoRaising);
    }
    dateFormat(date: Date) {
        const inputDate = moment(date, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        const formattedDate = inputDate.format('YYYY-MM-DD');
        this.collection.get('raisingDate')?.patchValue(formattedDate);

        console.log(formattedDate, 'hiiiiiiiiiiiiiiiiiiiiii');
    }
    EnddateFormat(date: Date) {
        const inputDate = moment(date, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        const formattedDate = inputDate.format('YYYY-MM-DD');
        this.collection.get('endDate')?.patchValue(formattedDate);

        console.log(formattedDate, 'hiiiiiiiiiiiiiiiiiiiiii');
    }
    startDateFormat(date: Date) {
        const inputDate = moment(date, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        const formattedDate = inputDate.format('YYYY-MM-DD');
        this.collection.get('startDate')?.patchValue(formattedDate);

        console.log(formattedDate, 'hiiiiiiiiiiiiiiiiiiiiii');
    }
    invoiceDateformat(date: Date) {
        const inputDate = moment(date, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        const formattedDate = inputDate.format('YYYY-MM-DD');
        this.collection.get('invoiceDate')?.patchValue(formattedDate);

        console.log(formattedDate, 'hiiiiiiiiiiiiiiiiiiiiii');
    }
    dueDateformat(date: Date) {
        const inputDate = moment(date, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        const formattedDate = inputDate.format('YYYY-MM-DD');
        this.collection.get('dueDate')?.patchValue(formattedDate);

        console.log(formattedDate, 'hiiiiiiiiiiiiiiiiiiiiii');
    }
    async submit() {
        // let tempObj = [];
        // tempObj.push(this.checkedStudentValue);
        // tempObj.forEach((el: any) => {
        //     this.studentObj.push({
        //         fullName: el.firstname + el.lastName,
        //         mobileNo: el.mobileNo,
        //         email: el.email,
        //         userId: el.studentId,
        //     });
        // });

        let raisingg = this.collection.value.raisingDate.name;
        this.collection.value.raisingDate = raisingg;

        this.collection.value.ownershipId = this.schoolId;
        this.collection.value.channels = [];
        console.log(this.collection.value.source);
        this.collection.value.source?.forEach((el: any) => {
            this.collection.value.channels.push(el.name);
        });
        this.collection.value.applicableOn = this.checkedStudentValue;
        let vpa = this.collection.value.vpa.name;

        delete this.collection.value.vpa;
        let frequency = this.collection.value.freq.name;
        delete this.collection.value.freq;

        this.collection.value.frequency = frequency;

        this.collection.value.vpa = vpa;
        delete this.collection.value.source;

        delete this.collection.value.dueDate;

        (this.collection.value.charges = this.myCharge),
            console.log(this.collection.value);

        await this.collSvc
            .createCollection(this.collection.value)
            .then((res: any) => {
                console.log(res);
            });

        // const startDates = this.collection.value.StartDate;
        // const formattedDate = startDates
        //     .toLocaleDateString('en-GB', {
        //         year: 'numeric',
        //         month: '2-digit',
        //         day: '2-digit',
        //     })
        //     .replace(/\//g, '-');
        // console.log(formattedDate);

        // let startDate = formattedDate;
        // collgrp.startDate = startDate;

        // delete collgrp.StartDate;

        // const endDates = this.collection.value.EndDate;
        // const formattedEnddate = endDates
        //     .toLocaleDateString('en-GB', {
        //         year: 'numeric',
        //         month: '2-digit',
        //         day: '2-digit',
        //     })
        //     .replace(/\//g, '-');
        // let endDate = formattedEnddate;
        // collgrp.endDate = endDate;

        // delete collgrp.EndDate;
    }
    // chargeItems = [{ name: 'test group' }];
    // rasieSource = [
    //     { name: '' },
    //     { name: 'whatsapp' },
    //     { name: 'email' },
    //     { name: 'sms' },
    // ];
    NotificationDate = [
        { name: '1' },
        { name: '2' },
        { name: '3' },
        { name: '4' },
        { name: '5' },
        { name: '6' },
        { name: '7' },
        { name: '8' },
        { name: '9' },
        { name: '10' },
        { name: '11' },
        { name: '12' },
        { name: '13' },
        { name: '14' },
        { name: '15' },
        { name: '16' },
        { name: '17' },
        { name: '18' },
        { name: '19' },
        { name: '20' },
        { name: '21' },
        { name: '22' },
        { name: '23' },
        { name: '24' },
        { name: '25' },
        { name: '26' },
        { name: '27' },
        { name: '28' },
    ];
    vpaId = [{ name: 'shivani@cosb' }];
    frequencyMonth = [
        { name: '1' },
        { name: '2' },
        { name: '3' },
        { name: '4' },
        { name: '6' },
    ];

    show() {
        this.ref = this.dialogService.open(AddChargeComponent, {
            header: 'Add a charge',
            // width: '40%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
        });

        this.ref.onClose.subscribe((charge: any) => {
            if (charge) {
                console.log(charge);

                this.myCharge.push(charge);
                // console.log(this.myCharge,"shivaniiiiiiiiiiiiiii");
                // localStorage.setItem(
                //     'myChargeData',
                //     JSON.stringify(this.myCharge)
                // );
                // console.log(this.myCharge,"shivaniiiiiiiiiiiiiii");
                // localStorage.setItem('myChargeData', JSON.stringify(this.myCharge));

                this.messageService.add({
                    severity: 'info',
                    summary: 'Product Selected',
                    detail: charge.name,
                });
            }

            // this.myCharge= [
            //{ column1: 'Value 1' , column2: 'Value 2' },
            //{ column1: 'Value 3', column2: 'Value 4' },
            // Add more data rows here
            //];

            console.log(this.myCharge);
        });

        this.ref.onMaximize.subscribe((value) => {
            this.messageService.add({
                severity: 'info',
                summary: 'Maximized',
                detail: `maximized: ${value.maximized}`,
            });
        });
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }
    onSelectedStudent2(ev: any) {
        this.checkedStudentValue = ev.map((student: any) => {
            return {
                fullName: student.firstName + ' ' + student.lastName,
                mobileNo: student.mobileNo,
                email: student.email,
                userId: student.uniqueId,
                balance: '1000',
            };
        });

        console.log('event select2--->', this.checkedStudentValue);
    }

    navigateToRoute() {
        this.router.navigateByUrl('/main/collection/list');
    }
}
