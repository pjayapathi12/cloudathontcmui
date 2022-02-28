import { NgModule } from "@angular/core";
import { CollapsibleSectionComponent, 
    SectionContentDirective 
} from "./collapsible-section.component";

@NgModule({
    imports: [

    ],
    exports: [ 
        CollapsibleSectionComponent,
        SectionContentDirective
    ],
    providers: [],
    declarations: [ 
        CollapsibleSectionComponent,
        SectionContentDirective
    ]
})

export class CollapsibleSectionModule {}