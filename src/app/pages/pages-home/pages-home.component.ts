import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {  RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-pages-home',
  templateUrl: './pages-home.component.html',
  styleUrl: './pages-home.component.scss',
  standalone: true,
  imports: [CommonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatAccordion,
    MatExpansionModule,
    RouterOutlet, RouterLink, RouterLinkActive

   ]
})
export class PagesHomeComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor( private observer: BreakpointObserver, private cd: ChangeDetectorRef) {

  }

  ngAfterViewInit() {

    this.observer.observe(['(max-width: 800px)']).subscribe((resp: any) => {
      if(resp.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
    this.cd.detectChanges();
  }

}
