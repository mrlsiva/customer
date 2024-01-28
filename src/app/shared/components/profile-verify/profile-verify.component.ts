import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'qdo365-profile-verify',
  templateUrl: './profile-verify.component.html',
  styleUrls: ['./profile-verify.component.scss']
})
export class ProfileVerifyComponent implements OnInit {

  userInfo: any;

  constructor(
    public dialogRef: MatDialogRef<ProfileVerifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.userInfo = this.auth.getUserInfo();
  }

  refresh(){
    this.dialogRef.close(true);
  }

}
