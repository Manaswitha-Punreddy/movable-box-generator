import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  keys = [87, 83, 65, 68, 46];
  boxes = [{id: 1}];
  keyboardControlEnabled: boolean = false;
  selectedBox: string = '0';
  posShift: number = 10;

  @HostListener('document:keydown', ['$event']) 
  handleKeyboardPressEvent(keyDownEvent: any) {
    if (this.keys.includes(keyDownEvent.keyCode) && this.keyboardControlEnabled) {
      this.moveBox(keyDownEvent);
    }
  }

  addBox(): void{
    this.boxes.push({id: this.boxes.length + 1});
  }

  toggleKeyboardControl(): void {
    this.keyboardControlEnabled = !this.keyboardControlEnabled;
  }

  selectBox(i: number): void {
    this.selectedBox = i.toString();
  }

  removeBox(): void {
    if (this.selectedBox?.length) {
      this.boxes.splice(Number(this.selectedBox), 1);
    }
  }

  moveBox(event: any): void {
    const box: any = document.getElementById(this.selectedBox)?.getBoundingClientRect();
    const left = parseInt(box.left, 10);
    const top = parseInt(box.top, 10);

    switch (event.keyCode) {

      case 87:
        this.moveBoxDirection('UP', left, top - this.posShift);
        break;
      case 83:
        this.moveBoxDirection('DOWN', left, top + this.posShift);
        break;
      case 65:
        this.moveBoxDirection('LEFT', left - this.posShift, top);
        break;
      case 68:
        this.moveBoxDirection('RIGHT', left + this.posShift, top);
        break;
      case 46:
        this.removeBox();
        break;
    }
  }

  moveBoxDirection(direction: string, left: number, top: number) {
    const boxFence = document.getElementById('boxes')?.getBoundingClientRect();

    if (boxFence) {
      switch(direction) {
        case 'UP':
          if (boxFence.top < top) {
            this.updateBoxPosition(this.selectedBox, left, top);
          }
          break;
        case 'DOWN':
          if (boxFence.bottom > top) {
            this.updateBoxPosition(this.selectedBox, left, top);
          }
          break;
        case 'LEFT':
          if (boxFence.left < left) {
            this.updateBoxPosition(this.selectedBox, left, top);
          }
          break;
        case 'RIGHT':
          if (boxFence.right > left) {
            this.updateBoxPosition(this.selectedBox, left, top);
          }
          break;
      }
    }
  }

  updateBoxPosition(selectedBox: string, left: number, top: number): void {
    const element = document.getElementById(selectedBox);
    if (element) {
      element.style.position = 'absolute';
      element.style.left = left + 'px';
      element.style.top = top + 'px';
      element.style.zIndex = selectedBox;
    }
  }
}
