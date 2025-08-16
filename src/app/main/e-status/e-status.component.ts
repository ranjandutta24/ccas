import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-e-status',
  templateUrl: './e-status.component.html',
  styleUrls: ['./e-status.component.scss'],
})
export class EStatusComponent implements OnInit {
  // labels = 'rter';

  coolingToweFan1 = 1;
  coolingToweFan2 = 0;
  coolingToweFan3 = 1;

  coolingWaterPump1 = 0;
  coolingWaterPump2 = 1;
  coolingWaterPump3 = 0;
  coolingWaterPump4 = 1;

  headingBg = '#CCCC00';
  sectionBg = '#0000FF';
  statusOff = '#FF6347';
  statusOn = '#32CD32';
  labels = {
    electricalStatus: 'Electrical Status',
    coolingTowerFan: 'Cooling Tower Fan',
    coolingTowerFan1: 'Cooling Tower Fan I',
    coolingTowerFan2: 'Cooling Tower Fan II',
    coolingTowerFan3: 'Cooling Tower Fan III',
    coolingWaterPump: 'Cooling Water Pump',
    coolingWaterPump1: 'Cooling Water Pump I',
    coolingWaterPump2: 'Cooling Water Pump II',
    coolingWaterPump3: 'Cooling Water Pump III',
    coolingWaterPump4: 'Cooling Water Pump IV',
    runningStatus: 'Running Status',
  };

  coolingTowerFans = [
    { name: 'Cooling Tower Fan I', status: 1 },
    { name: 'Cooling Tower Fan II', status: 0 },
    { name: 'Cooling Tower Fan III', status: 1 },
  ];

  coolingWaterPumps = [
    { name: 'Cooling Water Pump I', status: 1 },
    { name: 'Cooling Water Pump II', status: 0 },
    { name: 'Cooling Water Pump III', status: 1 },
    { name: 'Cooling Water Pump IV', status: 0 },
  ];
  constructor() {}

  ngOnInit(): void {}
}
