import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

	items: any[];

  constructor() { }

  ngOnInit() {

  	this.items = [];

  	for (let i = 0; i <= 100; i++) {
  		this.items.push({});
  		console.log('ITEM PUSH', this.items);
  	}
  }

}
