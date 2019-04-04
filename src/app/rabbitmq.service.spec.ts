import { TestBed } from '@angular/core/testing';

import { RabbitMqService } from './rabbitmq.service';

describe('RabbitMqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RabbitMqService = TestBed.get(RabbitMqService);
    expect(service).toBeTruthy();
  });
});
