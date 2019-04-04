import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { QueueConfiguration } from '../rabbitmq.service';

@Component({
  selector: 'app-queue-form',
  templateUrl: './queue-form.component.html',
  styleUrls: ['./queue-form.component.scss']
})
export class QueueFormComponent implements OnInit {

  @Output() submit = new Subject<QueueConfiguration>();
  queueForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit() {
    this.queueForm = this.formBuilder.group({
      name: new FormControl(undefined, Validators.required),
      durable: new FormControl(true),
      autoDelete: new FormControl(false),
      messageTtl: new FormControl(),
    });
  }

  onSubmit(): void {
    const config: QueueConfiguration = {
      name: this.queueForm.value.name,
      durable: this.queueForm.value.durable,
      autoDelete: this.queueForm.value.autoDelete,
      messageTtl: this.queueForm.value.messageTtl ? Number(this.queueForm.value.messageTtl) : undefined,
    };

    this.submit.next(config);
  }

}
