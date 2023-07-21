import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-payment-summary',
    templateUrl: './payment-summary.component.html',
    styleUrls: ['./payment-summary.component.scss'],
})
export class PaymentSummaryComponent implements OnInit {
    paymentSummary: any[] = [];
    showDateRange = false;
    sidebarVisible2: boolean = false;

    constructor() {}
    ngOnInit(): void {
        this.paymentSummary = [
            {
                paymentDate: '2023-07-01',
                firstName: 'John',
                paymentMode: 'Credit Card',
                status: 'Paid',
                planName: 'Standard Plan',
                balance: 0,
                paymentAmount: 50,
                balanceEMIs: 0,
            },
            {
                paymentDate: '2023-07-02',
                firstName: 'Jane',
                paymentMode: 'PayPal',
                status: 'Paid',
                planName: 'Premium Plan',
                balance: 0,
                paymentAmount: 75,
                balanceEMIs: 0,
            },
            {
                paymentDate: '2023-07-05',
                firstName: 'Bob',
                paymentMode: 'Bank Transfer',
                status: 'Pending',
                planName: 'Basic Plan',
                balance: 25,
                paymentAmount: 25,
                balanceEMIs: 0,
            },
            {
                paymentDate: '2023-07-08',
                firstName: 'Alice',
                paymentMode: 'Debit Card',
                status: 'Paid',
                planName: 'Premium Plan',
                balance: 0,
                paymentAmount: 75,
                balanceEMIs: 0,
            },
            {
                paymentDate: '2023-07-10',
                firstName: 'David',
                paymentMode: 'Credit Card',
                status: 'Paid',
                planName: 'Standard Plan',
                balance: 0,
                paymentAmount: 50,
                balanceEMIs: 0,
            },
            {
                paymentDate: '2023-07-15',
                firstName: 'Eva',
                paymentMode: 'Bank Transfer',
                status: 'Paid',
                planName: 'Premium Plan',
                balance: 0,
                paymentAmount: 75,
                balanceEMIs: 0,
            },
            {
                paymentDate: '2023-07-18',
                firstName: 'Michael',
                paymentMode: 'Debit Card',
                status: 'Pending',
                planName: 'Basic Plan',
                balance: 25,
                paymentAmount: 25,
                balanceEMIs: 0,
            },
            {
                paymentDate: '2023-07-20',
                firstName: 'Olivia',
                paymentMode: 'Credit Card',
                status: 'Paid',
                planName: 'Premium Plan',
                balance: 0,
                paymentAmount: 75,
                balanceEMIs: 0,
            },
            {
                paymentDate: '2023-07-22',
                firstName: 'William',
                paymentMode: 'PayPal',
                status: 'Paid',
                planName: 'Standard Plan',
                balance: 0,
                paymentAmount: 50,
                balanceEMIs: 0,
            },
            {
                paymentDate: '2023-07-25',
                firstName: 'Sophia',
                paymentMode: 'Bank Transfer',
                status: 'Paid',
                planName: 'Premium Plan',
                balance: 0,
                paymentAmount: 75,
                balanceEMIs: 0,
            },
        ];
    }
    saveOptions = [
        {
            label: 'Download as Excel',
            icon: 'pi pi-file-excel',
            command: () => {
                this.exportTableData('xlsx');
            },
        },
        {
            label: 'Download as CSV',
            icon: 'pi pi-file',
            command: () => {
                this.exportTableData('csv');
            },
        },
    ];
    onDateSelect(option: any) {
        console.log(option);
        if (option.name === 'Custom') {
            this.showDateRange = true;
        } else if (option.name != 'Custom') {
            this.showDateRange = false;
        }
    }
    date = [
        { name: 'Today' },
        { name: 'This Week' },
        { name: 'This Month' },
        { name: 'This Year' },
        { name: 'Custom' },
    ];
    exportTableData(format: any) {
        alert('Your file is being downloaded. Please wait...');
        const rows = [];
        const columns = [
            'Customer Name',
            'EMI Plan',
            'Total Balance',
            'Next Payment Amount',
            'Next Payment Date',
            'Balance EMIs',
            'Adjustments',
        ];
        rows.push(columns);
        for (const customers of this.paymentSummary) {
            rows.push([
                customers.firstNmae + ' ' + customers.lastName,
                customers.planName,
                customers.balance,
                customers.paymentAmount,
                customers.paymentDate,
                customers.balanceEMIs,
                customers.mextPaymentDueDate,
                customers.balanceEMIs,
                customers.adjustments,
            ]);
        }
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(rows);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'PaymentSummary');
        let bookType: any, fileName;
        if (format === 'csv') {
            bookType = 'csv';
            fileName = 'PaymentSummary.csv';
        } else if (format === 'xlsx') {
            bookType = 'xlsx';
            fileName = 'PaymentSummary.xlsx';
        }
        const buffer = XLSX.write(workbook, { bookType, type: 'array' });
        const file = new Blob([buffer], { type: 'application/octet-stream' });
        FileSaver.saveAs(file, fileName);
    }
}
