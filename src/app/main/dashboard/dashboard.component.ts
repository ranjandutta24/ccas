import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexAxisChartSeries,
  // ApexTitleSubtitle,
  // ApexFill,
  // ApexMarkers,
  // ApexYAxis,
  // ApexXAxis,
  // ApexTooltip,
} from 'ng-apexcharts';
import { dataSeries } from './data-series';
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
  // public series: ApexAxisChartSeries;
  // public chart: ApexChart;
  // public dataLabels: ApexDataLabels;
  // public markers: ApexMarkers;
  // public title: ApexTitleSubtitle;
  // public fill: ApexFill;
  // public yaxis: ApexYAxis;
  // public xaxis: ApexXAxis;
  // public tooltip: ApexTooltip;

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

  MOTOR_CURR_COMP1: any = 0;
  MOTOR_CURR_COMP2: number = 0;
  MOTOR_CURR_COMP3: number = 0;
  MOTOR_CURR_COMP4: number = 0;
  MOTOR_CURR_COMP5: number = 0;
  MOTOR_CURR_COMP6: number = 0;

  private sseSub?: Subscription;
  public chartOptions: ChartOptions;
  active_compath = './../../../assets/compressor_running_with_smoke.gif';
  // active_compath = './../../../assets/compressor.png';
  deactive_compath = './../../../assets/compressor (1).png';

  constructor(private sseService: SseService) {
    // this.initChartData();
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
          show: true, // show toolbar but customize it
          tools: {
            download: false, // ❌ hides the download (PNG/SVG/CSV) option
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
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
    // console.log(this.chartOptions);
    this.sseService
      .getServerSentEvent('http://10.150.6.15:4060/api/utility/ccas_dashboard')
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
        this.chartOptions!.series[0]!.data[0]!.y = this.MOTOR_CURR_COMP1;
        this.chart.updateSeries(this.chartOptions.series, true);
      });
  }

  // public initChartData(): void {
  //   let ts2 = 1484418600000;
  //   let dates = [];
  //   for (let i = 0; i < 120; i++) {
  //     ts2 = ts2 + 86400000;
  //     dates.push([ts2, dataSeries[1][i].value]);
  //   }

  //   this.series = [
  //     {
  //       name: "XYZ MOTORS",
  //       data: dates
  //     }
  //   ];
  //   this.chart = {
  //     type: "area",
  //     stacked: false,
  //     height: 350,
  //     zoom: {
  //       type: "x",
  //       enabled: true,
  //       autoScaleYaxis: true
  //     },
  //     toolbar: {
  //       autoSelected: "zoom"
  //     }
  //   };
  //   this.dataLabels = {
  //     enabled: false
  //   };
  //   this.markers = {
  //     size: 0
  //   };
  //   this.title = {
  //     text: "Stock Price Movement",
  //     align: "left"
  //   };
  //   this.fill = {
  //     type: "gradient",
  //     gradient: {
  //       shadeIntensity: 1,
  //       inverseColors: false,
  //       opacityFrom: 0.5,
  //       opacityTo: 0,
  //       stops: [0, 90, 100]
  //     }
  //   };
  //   this.yaxis = {
  //     labels: {
  //       formatter: function(val) {
  //         return (val / 1000000).toFixed(0);
  //       }
  //     },
  //     title: {
  //       text: "Price"
  //     }
  //   };
  //   this.xaxis = {
  //     type: "datetime"
  //   };
  //   this.tooltip = {
  //     shared: false,
  //     y: {
  //       formatter: function(val) {
  //         return (val / 1000000).toFixed(0);
  //       }
  //     }
  //   };
  // }
}
