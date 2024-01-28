import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'qdo365-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TermsComponent>
  ) { }

  ngOnInit(): void {
  }

  close(closeType){
    this.dialogRef.close(closeType);
  }

}
