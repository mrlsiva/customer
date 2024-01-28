import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'qdo365-coming-soon-popup',
  templateUrl: './coming-soon-popup.component.html',
  styleUrls: ['./coming-soon-popup.component.scss']
})
export class ComingSoonPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ComingSoonPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close(true);
  }

}
