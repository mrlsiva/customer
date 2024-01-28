import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ReadLetterComponent } from 'src/app/shared/components/read-letter/read-letter.component';

@Component({
  selector: 'qdo365-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  viewMode = 'QDO_CARDS';
  @ViewChild('slickModal', { static: false })
  slickModal: SlickCarouselComponent;
  slideConfig = {};
  selectedViewDetails: any = {};
  imageFirst: boolean = true;
  imageLast: boolean = false;
  buttonObj = [
    { id: '1', code: 'QDO_CARDS', name: 'Quality Management Tools', subname: 'for brands, businesses & business owners who are just starting out.   ' },
    { id: '2', code: 'QDO_ONLINE', name: 'Dedicated Team Support', subname: 'for every committed business owner who wishes to boost their brand.' },
    { id: '3', code: 'QDO_OFFLINE', name: 'Outstanding outreach', subname: 'that that enables your brand to potentially reach its target audience. ' },
  ];


  constructor(public dialog: MatDialog) {
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(ReadLetterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {

  }
  partnerClicked(id: string) {
    const selectedObj = this.buttonObj.filter((x) => x.id == id) || [];
    if (selectedObj.length > 0) {
      this.viewMode = selectedObj[0].code;
    }
  }
  getViewMode() {
    const selectedObj =
      this.buttonObj.filter((x) => x.code == this.viewMode) || [];
    if (selectedObj.length > 0) {
      this.selectedViewDetails = selectedObj[0];
      return selectedObj[0].code;
    }
    return null;
  }

}
