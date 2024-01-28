import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'qdo365-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.scss']
})
export class OurTeamComponent implements OnInit {
  users = [
    {"name":"Jabeer KM","position":"Co-Founder", src: '', srcOut: "../../../../assets/images/team/members/jabeer.svg",srcOn:"../../../../assets/images/team/members-color/jabeer.svg" },
    {"name":"Vazeem Jadeer","position":"Co-Founder", src: '', srcOut: "../../../../assets/images/team/members/Vazeem.svg",srcOn:"../../../../assets/images/team/members-color/Vazeem.svg" },
    {"name":"Ganesh S","position":"Co-Founder", src: '', srcOut: "../../../../assets/images/team/members/ganesh.svg",srcOn:"../../../../assets/images/team/members-color/ganesh.svg" },
    {"name":"Jafeer PK","position":"Co-Founder", src: '', srcOut: "../../../../assets/images/team/members/jafeer.svg",srcOn:"../../../../assets/images/team/members-color/jafeer.svg" },
    {"name":"Deepak","position":"Mentor", src: '', srcOut: "../../../../assets/images/team/members/deepak.svg",srcOn:"../../../../assets/images/team/members-color/deepak.svg" },
    {"name":"Sanchi Singh","position":"Mentor", src: '', srcOut: "../../../../assets/images/team/members/sanchi.svg",srcOn:"../../../../assets/images/team/members-color/sanchi.svg" },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
