import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { initFlowbite } from 'flowbite';
import { ISubToken } from '../../models/ISubToken';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  private loginService = inject(LoginService);
  private cd = inject(ChangeDetectorRef);
  private router = inject(Router);
  private toast = inject(ToastrService);
  public subToken: ISubToken | null = null;
  public isDropdownOpen: { [key: string]: boolean} = {};

  ngOnInit(): void {
    this.subToken = this.loginService.decodeToken();
    initFlowbite();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']).then(() => this.cd.detectChanges());
  }
}
