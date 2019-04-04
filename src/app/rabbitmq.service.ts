import { Injectable } from '@angular/core';
import { connect, Channel, Connection } from 'amqplib';

export interface QueueConfiguration {
  name: string;
  durable?: boolean;
  autoDelete?: boolean;
  messageTtl?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RabbitMqService {
  async getConnection(): Promise<Connection> {
    return connect('amqp://localhost');
  }

  async getChannel(): Promise<Channel> {
    const conn = await this.getConnection();
    return conn.createChannel();
  }

  async assertQueue(queueConfiguration: QueueConfiguration): Promise<void> {
    const channel = await this.getChannel();
    await channel.assertQueue(queueConfiguration.name, {
      durable: queueConfiguration.durable,
      autoDelete: queueConfiguration.autoDelete,
      messageTtl: queueConfiguration.messageTtl,
    });
  }
}
