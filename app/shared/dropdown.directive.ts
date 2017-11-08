import { Directive, HostListener, HostBinding } from '@angular/core';
// use it in coupon create form for "Type" field
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
