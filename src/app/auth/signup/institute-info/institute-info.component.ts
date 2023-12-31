import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
} from '@angular/forms';

interface Board {
    name: string;
}
import { MessageService } from 'primeng/api';

import { InstituteInfoModel } from 'src/app/models/institute-info.model';
import { state } from '@angular/animations';
import { InstituteService } from '../../../services/institute.service';
import { StateService } from '../../../services/state.service';
import {
    AddressDetails,
    PostOffice,
} from 'src/app/models/addressDetails.models';
import { AddressService } from 'src/app/services/address.service';
@Component({
    selector: 'app-institute-info',
    templateUrl: './institute-info.component.html',
    styleUrls: ['./institute-info.component.scss'],
})
export class InstituteInfoComponent implements OnInit {
    @Output() onSaveInstInfo = new EventEmitter();
    instituteInfo!: FormGroup;
    submitted = false;

    board!: Board[];
    // newBoardName: any;
    selectedBoard!: Board;
    loading = false;
    addressDetails!: AddressDetails;
    toggleDisplay: boolean = false;
    postOfficeDetails!: PostOffice;

    constructor(
        private fb: FormBuilder,
        private msg: MessageService,
        private instSvc: InstituteService,
        private stateSvc: StateService,
        private addressService: AddressService
    ) {
        this.board = [{ name: 'CBSE' }, { name: 'ICSE' }, { name: 'MSBE' }];
    }
    ngOnInit(): void {
        this.instituteInfo = this.fb.group({
            instituteName: ['', Validators.required],
            instituteType: ['', Validators.required],
            institutePhone: ['', Validators.required],
            instituteWebsite: ['', Validators.required],
            instituteEmail: ['', Validators.required],
            line1: ['', Validators.required],
            line2: ['', Validators.required],
            pinCode: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required],
            boardType: ['', Validators.required],
            spocName: ['', Validators.required],
            spocNumber: ['', Validators.required],
            spocEmail: ['', Validators.required],
        });
    }

    async submit1() {
        this.submitted = true;

        let myUserId: any = this.stateSvc.getUserData('userId');

        // this.loading = true;
        if (this.instituteInfo.invalid) {
            this.msg.add({
                severity: 'error',
                summary: 'Invalid',
                detail: 'All fields are Required',
            });
            this.loading = false;

            return;
        }

        const myInstitute = this.instituteInfo.value;
        const selectedInsType =
            this.instituteInfo.get('instituteType')?.value.name;
        const selectedBoard = this.instituteInfo.get('boardType')?.value.name;

        myInstitute.boardType = selectedBoard;
        myInstitute.instituteType = selectedInsType;

        const institutesAddress = {
            line1: myInstitute.line1,
            line2: myInstitute.line2,
            pinCode: myInstitute.pinCode,
            state: myInstitute.state,
            city: myInstitute.city,
            country: myInstitute.country,
        };

        console.log(myInstitute, 'check thissss');

        
        const instituteInfoObj: InstituteInfoModel = {
            userId: myUserId,
            instituteName: myInstitute.instituteName,
            instituteType: myInstitute.instituteType,
            institutePhone: myInstitute.institutePhone,
            instituteWebsite: myInstitute.instituteWebsite,
            instituteEmail: myInstitute.instituteEmail,
            boardType: myInstitute.boardType,

            spocName: myInstitute.spocName,
            spocEmail: myInstitute.spocEmail,
            spocNumber: myInstitute.spocNumber,
            address: institutesAddress,
        };
        console.log(instituteInfoObj, '<<<<<<<<<<<<');

        if (instituteInfoObj) {
            this.onSaveInstInfo.emit(instituteInfoObj);
        }
    }
    submitForm() {}
    instituteTypes = [
        { name: 'SCHOOL' },
        { name: 'JrCollege' },
        { name: 'UNIVERSITY' },
        { name: 'COACHING' },
        { name: 'KG' },
    ];

    // addBoard(board: any) {
    //     console.log(board);
    //     this.newBoardName = this.InstituteInfo.get('newBoard');
    //     // Create a new board object using the value from the input box
    //     const newBoard = { name: this.newBoardName };

    //     // Add the new board to the list of boards
    //     this.board.push(newBoard);
    //     console.log(this.board);

    //     // Reset the input box value
    //     // this.newBoardName = '';
    // }

    onKeyUp() {
        console.log('object');
    }

    getPin() {
        console.log('Call...........');

        const { pinCode } = this.instituteInfo.value;
        console.log(pinCode);
        if (pinCode.length == 6) {
            let temp: any;
            this.addressService.getPinData(pinCode).subscribe((data: any) => {
                this.toggleDisplay = true;

                for (let pinData of data) {
                    console.log(pinData);
                    if (pinData.Status === 'Success') {
                        let postOfficeData = pinData.PostOffice[0];
                        temp = postOfficeData;
                        console.log(postOfficeData);

                        if (this.instituteInfo.get('country')) {
                            console.log('country found');
                        }
                    } else if (pinData.Status === 'Error') {
                        {
                            this.instituteInfo
                                .get('country')
                                ?.setValue('Invalid pincode!!!');
                            this.instituteInfo
                                .get('state')
                                ?.setValue('Invalid pincode!!!');
                            this.instituteInfo
                                .get('state')
                                ?.setValue('Invalid pincode!!!');
                            this.instituteInfo
                                .get('city')
                                ?.setValue('Invalid pincode!!!');
                        }
                    }

                    this.instituteInfo.get('country')?.setValue(temp.Country);
                    this.instituteInfo.get('state')?.setValue(temp.State);
                    this.instituteInfo.get('city')?.setValue(temp.District);
                }
            });
        }
    }
}
