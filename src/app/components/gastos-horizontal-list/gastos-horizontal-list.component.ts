import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Constants from 'src/constants';
import Utils from 'src/app/shared/Utils';
import { UltimosGastos } from 'src/app/models/models';

@Component({
  selector: 'app-gastos-horizontal-list',
  templateUrl: './gastos-horizontal-list.component.html',
  styleUrls: ['./gastos-horizontal-list.component.scss']
})
export class GastosHorizontalListComponent {
  gastos: UltimosGastos[] = [];


  constructor( private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAll(Constants.END_POINTS.ULTIMOS_10_GASTOS).subscribe((gastos) => {
      this.gastos = gastos;
    });
  }

  formatDate(date: Date) {
    return Utils.formatDate(date);
  }
}
