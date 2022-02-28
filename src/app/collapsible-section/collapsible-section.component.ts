import { Component, Directive, Input, OnInit } from '@angular/core';

@Component({
    selector: 'collapsible-section',
  templateUrl: './collapsible-section.component.html',
  styleUrls: ['./collapsible-section.component.css']
})
export class CollapsibleSectionComponent implements OnInit {
  
    @Input() headerName: string;
    show: boolean;

    constructor() { }
    
    ngOnInit(): void {
        this.show = false;
    }

    toggleModule() {
        this.show = !this.show;
    }
}

@Directive({
    selector: 'section-content'
})
export class SectionContentDirective { }