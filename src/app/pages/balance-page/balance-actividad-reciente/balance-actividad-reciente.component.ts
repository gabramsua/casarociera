import { Component, Input } from '@angular/core';
import { BalanceDeEventoResponse } from 'src/app/models/models';

@Component({
  selector: 'app-balance-actividad-reciente',
  standalone: false,
  templateUrl: './balance-actividad-reciente.component.html',
  styleUrl: './balance-actividad-reciente.component.scss'
})
export class BalanceActividadRecienteComponent {
  @Input() balanceDeEvento!: BalanceDeEventoResponse;

}
