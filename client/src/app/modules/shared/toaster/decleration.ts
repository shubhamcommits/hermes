import { ToasterComponent } from './component';
import { ToasterContainerComponent } from './component/toast-container/toast-container.component';
import { ToasterService } from './service';

export const component = [
     ToasterComponent,
     ToasterContainerComponent
]


export const provider = [
    ToasterService
]


export  const exportcomponent = [
    ToasterContainerComponent
]