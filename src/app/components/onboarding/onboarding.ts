import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Navbar } from "../navbar/navbar";


@Component({
  selector: 'app-onboarding',
  imports: [Navbar],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss'
})
export class Onboarding {

  constructor(
    private readonly router: Router
  ){}

  public redirectToRegisterFood(): void {
    this.router.navigate(['register-food'])
  }

  public redirectToList(): void {
    this.router.navigate(['storage-list'])
  }


}
