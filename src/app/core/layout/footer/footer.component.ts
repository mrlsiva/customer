import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'qdo365-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  current_year: number = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
