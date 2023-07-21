import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
    data: any;

    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
            labels: ['Fees Paid', 'Not Applicable', 'Not Paid'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: ['#9b72f5', '#01A9F1', '#f0ccff'],
                    hoverBackgroundColor: ['#754ECF', '#01A9F1', '#f0ccff'],
                },
            ],
        };

        this.options = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            height: '300px', // Set your desired height here
        };
    }
}
