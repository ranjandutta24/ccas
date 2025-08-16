import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  constructor() {}
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
    { label: 'IGCA Flow', unit: 'Nm³/hr', value: 232 },
    { label: 'IGCA Pressure', unit: 'kg/cm²', value: 213 },
    { label: 'PGCA Flow', unit: 'Nm³/hr', value: 123 },
    { label: 'PGCA Pressure', unit: 'kg/cm²', value: 213 },
  ];

  compressorFlows = [12, 32, 34, 12, 23, 24]; // computed with * 1.72
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
  ngOnInit(): void {}
}
