import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  menuItems: any[] = [];  

  constructor() { }

  ngOnInit() {
    this.createMenuItems();
  }

  createMenuItems() {
    this.menuItems = [
      {
        text: 'Cadastros',
        items: [
          {
            text: 'Clientes',
            href: '/clientes',
            icon: 'people'
          },
        ]
      },
    ];
  }

}
