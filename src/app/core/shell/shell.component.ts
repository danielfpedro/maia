import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  // styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  constructor(private router: Router,
              // private titleService: Title,
              private media: ObservableMedia,
              ) { }

  ngOnInit() { }

  // setLanguage(language: string) {
  //   this.i18nService.language = language;
  // }

  // logout() {
  //   this.authenticationService.logout()
  //     .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  // }

  // get username(): string {
  //   const credentials = this.authenticationService.credentials;
  //   return credentials ? credentials.username : null;
  // }

  // get languages(): string[] {
  //   return this.i18nService.supportedLanguages;
  // }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  // get title(): string {
  //   return this.titleService.getTitle();
  // }
}