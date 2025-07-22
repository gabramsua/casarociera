import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BalanceDeEventoResponse } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import Constants from 'src/constants';

@Component({
    selector: 'app-balance-page',
    templateUrl: './balance-page.component.html',
    styleUrls: ['./balance-page.component.scss'],
    standalone: false
})
export class BalancePageComponent {
    dataSource: BalanceDeEventoResponse[] = [];

  constructor( private router: Router, private api: ApiService, private dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.api.getAllByCasa(Constants.END_POINTS.BALANCE_EVENTO).subscribe((response: BalanceDeEventoResponse[]) => {
      this.dataSource = response;
    });
  }
}
