import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BalanceDeEventoCabecera } from 'src/app/models/models';

@Component({
  selector: 'app-balance-cabecera',
  imports: [CommonModule],
  templateUrl: './balance-cabecera.component.html',
  styleUrl: './balance-cabecera.component.scss'
})
export class BalanceCabeceraComponent {
  @Input() balanceDeEventoCabecera!: BalanceDeEventoCabecera;
}
