import { Component, OnInit, ViewChild } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ChartOptions } from 'chart.js';
import Chart from 'chart.js/auto';
import { InstituteService } from '../../services/institute.service';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    data: any;
    options: any;
    userData: any;
    products!: Product[];

    virtualProducts!: Product[];
    constructor(
        private stateSvc: StateService,
        private instSvc: InstituteService,
        private router: Router,
        private productService: ProductService
    ) {
        this.instSvc.getErrorObservable().subscribe((error) => {
            if (error) {
                this.router.navigate(['auth/login']);
            }
        });
        this.productService.getProducts().then((products) => {
            this.products = products;
        });
        this.virtualProducts = Array.from({ length: 10000 });
    }

    chartData: any;
    chartOptions: any;
    title = 'chartjs-project';
    canvas: any;
    ctx: any;
    @ViewChild('mychart') mychart: any;

    ngOnInit(): void {
        let myUser: any = this.stateSvc.getUserData('userId');

        this.userData = this.stateSvc.getUserData('newUser');
        this.userData = JSON.parse(this.userData);
        console.log(this.userData);
        console.log(myUser);
        this.instSvc.getInstitutesForUser(myUser).then((res: any) => {
            console.log(res);
        });
        this.productService
            .getProductsSmall()
            .then((products) => (this.products = products));
    }

    ngAfterViewInit() {
        this.canvas = this.mychart.nativeElement;

        this.ctx = this.canvas.getContext('2d');

        // const data1 = [80, 78, 77, 72, 74, 75, 73, 71, 75, 77, 74, 75];
        // const data2 = [72, 76, 73, 68, 70, 71, 75, 75, 77, 80, 74, 76];
        const data3 = [67, 70, 66, 61, 58, 63, 69, 70, 65, 66, 61, 58];
        const data4 = [70, 65, 63, 67, 62, 57, 60, 60, 63, 66, 67, 62];
        const data5 = [67, 70, 66, 61, 58, 63, 69, 70, 65, 66, 70, 66];
        const data6 = [67, 70, 66, 61, 58, 63, 69, 70, 65, 66, 58, 63];

        new Chart(this.ctx, {
            type: 'line',
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Fees collected this year ',
                    },
                },
                scales: {
                    y: {
                        min: 50,
                        grid: {
                            color: 'rgba(0, 0, 0, 0)', // Set the gridlines color to transparent
                        },
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0)', // Set the gridlines color to transparent
                        },
                    },
                },
            },

            data: {
                datasets: [
                    // {
                    //   tension: 0.2,
                    //   label: "V",
                    //   data: data1,
                    //   backgroundColor: "#0747a1",

                    //   borderColor: "#0747a1",
                    // },
                    // {
                    //   label: "VI",
                    //   data: data2,
                    //   backgroundColor: "#1477d2",
                    //   tension: 0.2,

                    //   borderColor: "#1477d2",
                    // },
                    // {
                    //   label: "VII",
                    //   data: data3,
                    //   backgroundColor: "#FFBF00",
                    //   tension: 0.2,

                    //   borderColor: "#FFBF00",
                    // },
                    {
                        tension: 0.2,
                        label: 'Raised',
                        data: data4,
                        backgroundColor: '#00A9F1',
                        borderColor: '#00A9F1',
                        borderWidth: 3.5,
                        pointRadius: 2,
                    },
                    {
                        tension: 0.2,
                        label: 'collection',
                        data: data6,
                        backgroundColor: '#651fff',
                        borderColor: '#651fff',
                        borderWidth: 3.5,
                        pointRadius: 2,
                    },
                ],
                labels: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                ],
            },
        });

        //doughnut chart

        this.canvas = this.mychart.nativeElement;

        this.ctx = this.canvas.getContext('2d');

        const data1 = [250, 120, 50];
        const total: any = data1.reduce((a: any, b: any) => a + b);
    }
}
