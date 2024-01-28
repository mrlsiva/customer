import { Directive, ElementRef, HostListener, Input, SimpleChanges } from '@angular/core';
import { AppToastrService } from 'src/app/core/services/toastr/app-toastr.service';

@Directive({
  selector: '[ahAlphanumericOnly]'
})
export class AlphaNumericOnlyDirective {

  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste',
  ];
  @Input() ahAlphanumericOnly?: string | RegExp;
  @Input() is_phone?: boolean;
  private regex: RegExp;
  inputElement: HTMLInputElement;

  constructor(public el: ElementRef, private toast: AppToastrService) {
    this.inputElement = el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ahAlphanumericOnly) {
      // console.log(this.ahAlphanumericOnly);
      this.regex = this.ahAlphanumericOnly ? RegExp(this.ahAlphanumericOnly) : null;
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): any {
    // console.log(this.ahAlphanumericOnly);
    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      ((e.key === 'a' || e.code === 'KeyA') && e.ctrlKey === true) || // Allow: Ctrl+A
      ((e.key === 'c' || e.code === 'KeyC') && e.ctrlKey === true) || // Allow: Ctrl+C
      ((e.key === 'v' || e.code === 'KeyV') && e.ctrlKey === true) || // Allow: Ctrl+V
      ((e.key === 'x' || e.code === 'KeyX') && e.ctrlKey === true) || // Allow: Ctrl+X
      ((e.key === 'a' || e.code === 'KeyA') && e.metaKey === true) || // Allow: Cmd+A (Mac)
      ((e.key === 'c' || e.code === 'KeyC') && e.metaKey === true) || // Allow: Cmd+C (Mac)
      ((e.key === 'v' || e.code === 'KeyV') && e.metaKey === true) || // Allow: Cmd+V (Mac)
      ((e.key === 'x' || e.code === 'KeyX') && e.metaKey === true) // Allow: Cmd+X (Mac)
    ) {
      // let it happen, don't do anything
      return;
    }

    let newValue = '';
    newValue = newValue || this.forecastValue(e.key);
    // check the input pattern RegExp
    if (this.regex) {
      if (!this.regex.test(newValue)) {
        e.preventDefault();
        return;
      }
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: any): void {
    let pastedInput: string;
    if (window['clipboardData']) {
      // Browser is IE
      pastedInput = window['clipboardData'].getData('text');
    } else if (event.clipboardData && event.clipboardData.getData) {
      // Other browsers
      pastedInput = event.clipboardData.getData('text/plain');
    }

    if (this.is_phone) {
      pastedInput = this.phone_verify(pastedInput);
    }
    this.pasteData(pastedInput);
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    const textData = event.dataTransfer.getData('text');
    this.inputElement.focus();
    this.pasteData(textData);
    event.preventDefault();
  }

  private pasteData(pastedContent: string): void {
    const sanitizedContent = this.sanitizeInput(pastedContent);
    const pasted = document.execCommand('insertText', false, sanitizedContent);
    if (!pasted) {
      if (this.inputElement.setRangeText) {
        const { selectionStart: start, selectionEnd: end } = this.inputElement;
        this.inputElement.setRangeText(sanitizedContent, start, end, 'end');
        if (typeof window['InstallTrigger'] !== 'undefined') {
          this.inputElement.dispatchEvent(new Event('input', { cancelable: true }));
        }
      } else {
        this.insertAtCursor(this.inputElement, sanitizedContent);
      }
    }
  }

  private insertAtCursor(myField: HTMLInputElement, myValue: string): void {
    const startPos = myField.selectionStart;
    const endPos = myField.selectionEnd;

    myField.value =
      myField.value.substring(0, startPos) +
      myValue +
      myField.value.substring(endPos, myField.value.length);

    const pos = startPos + myValue.length;
    myField.focus();
    myField.setSelectionRange(pos, pos);

    this.triggerEvent(myField, 'input');
  }

  private triggerEvent(el: HTMLInputElement, type: string): void {
    if ('createEvent' in document) {
      // modern browsers, IE9+
      const e = document.createEvent('HTMLEvents');
      e.initEvent(type, false, true);
      el.dispatchEvent(e);
    }
  }

  private sanitizeInput(input: string): string {
    let result = '';
    if (this.regex.test(input + this.inputElement.value)) {
      result = input.replace(this.ahAlphanumericOnly, '');
    } else if (this.is_phone) {
      this.inputElement.value = null;
      result = input;
    } else {
      this.toast.error('Please enter valid text')
    }
    const maxLength = this.inputElement.maxLength;
    if (maxLength > 0) {
      const allowedLength = maxLength - this.inputElement.value.length;
      result = allowedLength > 0 ? result.substring(0, allowedLength) : '';
    }
    return result;
  }

  private forecastValue(key: string): string {
    const selectionStart = this.inputElement.selectionStart;
    const selectionEnd = this.inputElement.selectionEnd;
    const oldValue = this.inputElement.value;
    const selection = oldValue.substring(selectionStart, selectionEnd);
    return selection
      ? oldValue.replace(selection, key)
      : oldValue.substring(0, selectionStart) +
      key +
      oldValue.substring(selectionStart);
  }

  private phone_verify(input: string): string {
    return input.replace(/[^0-9]/g, "");;
  }

}
