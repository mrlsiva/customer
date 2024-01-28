import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import anchorme from "anchorme";
@Directive({
  selector: '[artAnchorme]'
})
export class AnchormeDirective implements OnInit{
  @Input() highlights:any;

  constructor(private el: ElementRef) {}
  ngOnInit(): void {
    // this.el.nativeElement.innerHTML=this.converTextToLinks(this.el.nativeElement.innerHTML)
    setTimeout(()=>{
      // console.log('init', this.el, this.el.nativeElement.innerHTML)
      this.el.nativeElement.innerHTML=this.converTextToLinks(this.el.nativeElement.innerHTML)
    }, 100)
	}
  converTextToLinks(plainText: string){
    // console.log(plainText);
    plainText=plainText.replace(/\n/g, "<br />");
    // var result = anchorme(plainText);
    let extensions_list=[
      {
        test: /&lt;br \/&gt;/g,
          transform: () =>
              `<br />`
      },
      {
        test: /#(\w|_)+/gi,
        transform: (string: string) =>
            `<span class="contain-hashtag" (click)="checkMe(${string.substr(1)})">${string}</span>`
      },
    ]
    if(this.highlights){
      for (let value of this.highlights) {
        extensions_list.push({
          test: new RegExp(value['highlight'], 'ig'),
          transform: () =>
              `<span class="contain-highlight" >${value['highlight']}</span>`
        },)
      }
    }
    let attributes={
      input:plainText,
      // attributes to add to the anchor tags
      // exclude: string => string.endWith("</"),
      attributes: {
        target: "_blank",
        class: "some-class"
      },
      extensions: extensions_list
    }
    var result = anchorme(attributes);
    return result;
  }

}
