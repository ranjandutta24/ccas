import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexAxisChartSeries,
} from 'ng-apexcharts';
import { SseService } from 'src/app/service/sse.servece';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  colors: string[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;

  igcaFlow: number = 0;
  igcaPresser: number = 0;
  pgcaFlow: number = 0;
  pgcaPresser: number = 0;
  AI_6_COMP1: number = 0;
  AI_6_COMP2: number = 0;
  AI_6_COMP3: number = 0;
  AI_6_COMP4: number = 0;
  AI_6_COMP5: number = 0;
  AI_6_COMP6: number = 0;

  MOTOR_CURR_COMP1: number = 0;
  MOTOR_CURR_COMP2: number = 0;
  MOTOR_CURR_COMP3: number = 0;
  MOTOR_CURR_COMP4: number = 0;
  MOTOR_CURR_COMP5: number = 0;
  MOTOR_CURR_COMP6: number = 0;

  private sseSub?: Subscription;
  public chartOptions: ChartOptions;
  active_compath = './../../../assets/compressor_running_with_smoke.gif';
  deactive_compath = './../../../assets/compressor (1).png';

  constructor(private sseService: SseService) {
    this.chartOptions = {
      series: [
        {
          name: 'Actual',
          data: [
            {
              x: 'Current Amp',
              y: this.MOTOR_CURR_COMP1,
              goals: [
                {
                  name: 'Expected',
                  value: 600,
                  strokeWidth: 5,
                  strokeColor: '#775DD0',
                },
              ],
            },
          ],
        },
      ],
      chart: {
        height: 105,
        type: 'bar',
        toolbar: {
          show: true,
          tools: {
            download: false,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
        animations: {
          enabled: false, // Disable animations to reduce flickering
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      colors: ['#084c35'],
      dataLabels: {
        formatter: function (val: any, opts) {
          const goals =
            opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex]
              .goals;

          if (goals && goals.length) {
            return `${val} / ${goals[0].value}`;
          }
          return val;
        },
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: ['Current', 'Limit'],
        markers: {
          fillColors: ['#00E396', '#775DD0'],
        },
      },
    };
  }

  ngOnInit(): void {
    this.sseSub = this.sseService
      .getServerSentEvent('http://10.150.6.15:4060/api/utility/ccas_dashboard')
      .pipe(debounceTime(100)) // Add debounce to reduce update frequency
      .subscribe((data: any) => {
        this.igcaFlow = parseInt(data.IGCA_FLOW);
        this.igcaPresser = parseFloat(data.IGCA_PRESSER.toFixed(2));
        this.pgcaFlow = parseInt(data.PGCA_FLOW);
        this.pgcaPresser = parseFloat(data.PGCA_PRESSER.toFixed(2));
        this.AI_6_COMP1 = parseInt(data.AI_6_COMP1);
        this.AI_6_COMP2 = parseInt(data.AI_6_COMP2);
        this.AI_6_COMP3 = parseInt(data.AI_6_COMP3);
        this.AI_6_COMP4 = parseInt(data.AI_6_COMP4);
        this.AI_6_COMP5 = parseInt(data.AI_6_COMP5);
        this.AI_6_COMP6 = parseInt(data.AI_6_COMP6);
        this.MOTOR_CURR_COMP1 = parseInt(data.MOTOR_CURR_COMP1);
        this.MOTOR_CURR_COMP2 = parseInt(data.MOTOR_CURR_COMP2);
        this.MOTOR_CURR_COMP3 = parseInt(data.MOTOR_CURR_COMP3);
        this.MOTOR_CURR_COMP4 = parseInt(data.MOTOR_CURR_COMP4);
        this.MOTOR_CURR_COMP5 = parseInt(data.MOTOR_CURR_COMP5);
        this.MOTOR_CURR_COMP6 = parseInt(data.MOTOR_CURR_COMP6);

        // Update chart data without causing full re-render
        if (this.chart && this.chartOptions) {
          this.chart.updateSeries(
            [
              {
                name: 'Actual',
                data: [
                  {
                    x: 'Current Amp',
                    y: this.MOTOR_CURR_COMP1,
                    goals: [
                      {
                        name: 'Expected',
                        value: 600,
                        strokeWidth: 5,
                        strokeColor: '#775DD0',
                      },
                    ],
                  },
                ],
              },
            ],
            false
          ); // The 'false' parameter prevents animation
        }
      });
  }

  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    if (this.sseSub) {
      this.sseSub.unsubscribe();
    }
  }
}
