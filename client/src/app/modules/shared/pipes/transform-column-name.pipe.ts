import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformColumnName'
})
export class TransformColumnNamePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    value = value.charAt(0).toUpperCase() + value.slice(1)
    value = value ? value.replace(/_/g, ' ') : value
    value = value.replace(/([A-Z])/g, ' $1').trim()
    return this.toTitleCase(value)
  }

  toTitleCase(str: any) {
    return str.replace(
      /\w\S*/g,
      function(txt: any) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      }
    )
  }

}
