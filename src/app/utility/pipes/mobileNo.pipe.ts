import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mobileNumber',
})
export class MobileNumberPipe implements PipeTransform {
    transform(value: string): string {
        const firstPart = value.slice(0, 5);
        const secondPart = value.slice(5, 10);

        return `${firstPart} ${secondPart}`;
    }
}
