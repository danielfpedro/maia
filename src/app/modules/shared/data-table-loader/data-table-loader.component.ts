import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-table-loader',
  templateUrl: './data-table-loader.component.html',
  styleUrls: ['./data-table-loader.component.scss']
})
export class DataTableLoaderComponent implements OnInit {

  @Input() public loading: boolean;

  constructor() { }

  ngOnInit() {
  }

}
