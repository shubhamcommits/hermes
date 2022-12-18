import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { component, exportcomponent, provider } from './decleration';

@NgModule({
     imports : [
          CommonModule
     ],
     declarations : component,
     exports : exportcomponent,
     providers : provider
})

export class ToasterModule{
    
}