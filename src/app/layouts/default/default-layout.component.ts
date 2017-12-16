import { Component, Input, OnInit } from '@angular/core';

import { ObservableMedia } from "@angular/flex-layout";

@Component({
  selector: 'app-layout-default',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  @Input() snav;

  constructor(private media: ObservableMedia) {

  }

  ngOnInit() {
    console.log('snab', this.snav);
  }


  sideNavControlOpened() {
    return (this.media.isActive('gt-sm'));
  }
  sideNavControlMode() {
    return (this.media.isActive('gt-sm')) ? 'side' : 'over';
  }

}
