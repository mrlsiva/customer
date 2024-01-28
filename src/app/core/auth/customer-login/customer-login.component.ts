import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'qdo365-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss']
})
export class CustomerLoginComponent implements OnInit {
  slideConfig = {};
  users = [
    { id: '1', src: '1.png', title:'Save Unlimited on your favourite brand every time.', sub:'Add your favourite brand in your QDO list and don’s miss a chance to not use it' },
    { id: '1', src: '2.png', title:'Explore Great Deal from your favourite Brands', sub:'Add your favourite brand in your QDO list and don’s miss a chance to not use it' },
  ];
  constructor() { }

  ngOnInit(): void {
    this.slideConfig = {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      infinite: false,
      dots: true,
      autoplay: true,
      fade: true,
      autoplaySpeed: 3000,
    };
  }

}
