import { Component } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Component({
    selector: 'app-bottom-nav',
    templateUrl: './bottom-nav.component.html',
    styleUrls: ['./bottom-nav.component.scss'],
    standalone: false
})
export class BottomNavComponent {
    environment = environment;
    listacompra: any[] = ['arroz', 'frijoles', 'carne']; 

}
