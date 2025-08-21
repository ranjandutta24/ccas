import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SseService } from 'src/app/service/sse.servece';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
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
  constructor(private sseService: SseService) {}
  title = 'Centralized Compressed Air Station Overview';

  compressorLabels = [
    'Compressor 1',
    'Compressor 2',
    'Compressor 3',
    'Compressor 4',
    'Compressor 5',
    'Compressor 6',
  ];

  parameters = [
    { label: 'IGCA Flow', unit: 'Nm³/hr', value: 0 },
    { label: 'IGCA Pressure', unit: 'kg/cm²', value: 0 },
    { label: 'PGCA Flow', unit: 'Nm³/hr', value: 0 },
    { label: 'PGCA Pressure', unit: 'kg/cm²', value: 0 },
  ];

  // compressorFlows = [12, 32, 34, 12, 23, 24]; // computed with * 1.72
  compressorCurrents = [324, 45, 45, 56, 67, 23]; // raw amp values

  plants = [
    'COB 11',
    'CDCP',
    'Sinter Plant',
    'Blast Furnace',
    'LDCP',
    'BOF',
    'CCP',
    'Wire Rod Mill',
    'Bar Mill',
    'USM',
    'PBS 2',
  ];

  currentThreshold = 50;
  ngOnInit(): void {
    // this.sseService
    //   .getServerSentEvent('http://10.150.6.15:4060/api/utility/ccas_dashboard')
    //   .subscribe((data: any) => {
    //     this.animateValue('igcaFlow', this.igcaFlow || 0, data.IGCA_FLOW, 1000);
    //     this.animateValue(
    //       'igcaPresser',
    //       this.igcaPresser || 0,
    //       data.IGCA_PRESSER,
    //       1000
    //     );
    //     this.animateValue('pgcaFlow', this.pgcaFlow || 0, data.PGCA_FLOW, 1000);
    //     this.animateValue(
    //       'pgcaPresser',
    //       this.pgcaPresser || 0,
    //       data.PGCA_PRESSER,
    //       1000
    //     );
    //   });

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
      });
  }
  private animateValue(
    field: keyof this,
    start: number,
    end: number,
    duration: number
  ) {
    // Ensure valid numbers
    if (isNaN(start)) start = 0;
    if (isNaN(end)) end = 0;

    const range = end - start;
    if (range === 0) {
      (this as any)[field] = end;
      return;
    }

    const steps = 30; // number of animation steps
    const stepTime = Math.max(Math.floor(duration / steps), 20);
    const increment = range / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const value = start + increment * currentStep;

      // Force integer (rounded) values
      (this as any)[field] = Math.round(value);

      if (currentStep >= steps) {
        clearInterval(timer);
        (this as any)[field] = end; // ensure final value
      }
    }, stepTime);
  }
}
