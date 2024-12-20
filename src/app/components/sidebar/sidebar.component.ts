import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ToastrService } from 'ngx-toastr';
import { NgClass, NgIf } from '@angular/common';
import { ISubToken } from '@/models/ISubToken';
import { LoginService } from "@/services/login/login.service"

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NgIf, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, AfterViewInit {

  private loginService = inject(LoginService);
  private cd = inject(ChangeDetectorRef);
  private router = inject(Router);
  private toast = inject(ToastrService);
  public subToken: ISubToken | null = null;
  loading: boolean = false;

  ngOnInit(): void {
    this.initializeFlowbite();
    this.subToken = this.loginService.decodeToken();
  }

  ngAfterViewInit(): void {
    this.initializeFlowbite();
  }

  logout() {
    this.loading = true;
    this.loginService.logout();
    this.router.navigate(['/login']).then(() => {
      this.cd.detectChanges();
      this.initializeFlowbite();
      this.loading = false;
    });
  }

  private initializeFlowbite() {
    initFlowbite();
  }

  isRouteActive(url: string) {
    return this.router.url === url;
  }
}
