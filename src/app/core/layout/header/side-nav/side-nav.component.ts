import { Component, OnInit, Input } from '@angular/core';
import { CommonUtilsService } from 'src/app/core/services/helper/common-utils.service';

@Component({
  selector: 'qdo365-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() sideMenuState: any;
  showSideNav: boolean = true;
  constructor(private siteNav: CommonUtilsService) { }

  ngOnInit(): void {
    
    this.showSideNav = this.sideMenuState;
    
  }
close(){
      this.siteNav.siteNavtoggleclose();
    }
}
