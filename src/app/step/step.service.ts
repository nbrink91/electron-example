import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum StepType {
  Queue
}

export interface Step {
  type: StepType;
  uuid: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class StepService {

  public onChange = new Subject<Step>();
  public onAdd = new Subject<Step>();
  public onUpdate = new Subject<Step>();

  private steps = new Map<string, Step>();

  addStep(step: Step) {
    this.steps.set(step.uuid, step);

    this.onChange.next(step);
    this.onAdd.next(step);
  }

  updateStep(step: Step) {
    this.steps.set(step.uuid, step);

    this.onChange.next(step);
    this.onUpdate.next(step);
  }

  getSteps(): Step[] {
    return [...this.steps.values()];
  }

}
