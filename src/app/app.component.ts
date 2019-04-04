import { Component, OnInit, ComponentFactoryResolver, ViewChild, Type, ComponentRef } from '@angular/core';
import { StepService, StepType, Step } from './step/step.service';
import * as uuid from 'uuid';
import { QueueFormComponent } from './queue-form/queue-form.component';
import { ContentDirective } from './content.directive';
import { RabbitMqService } from './rabbitmq.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(ContentDirective) content: ContentDirective;

  steps: Step[];

  constructor(
    private readonly stepService: StepService,
    private readonly resolver: ComponentFactoryResolver,
    private readonly queueService: RabbitMqService) { }

  ngOnInit(): void {
    this.stepService.onChange.subscribe(() => {
      this.steps = this.stepService.getSteps();
    });

    this.stepService.onAdd.subscribe(step => {
      switch (step.type) {
        case StepType.Queue: {
          const componentRef = this.createComponentRef(QueueFormComponent);
          const component = componentRef.instance;
          component.submit.subscribe(data => {
            step.data = data;
            this.stepService.updateStep(step);
            console.log(step);
            componentRef.destroy();
          });
        }
      }
    });
  }

  declareQueue(): void {
    this.stepService.addStep({
      type: StepType.Queue,
      uuid: uuid()
    });
  }

  onRun(): void {
    this.steps.forEach(step => {
      switch (step.type) {
        case StepType.Queue: {
          this.queueService.assertQueue(step.data);
          break;
        }
      }
    });
  }

  private createComponentRef<T>(type: Type<T>): ComponentRef<T> {
    const factory = this.resolver.resolveComponentFactory(type);

    const viewContainerRef = this.content.viewContainerRef;
    viewContainerRef.clear();

    return this.content.viewContainerRef.createComponent(factory);
  }
}
