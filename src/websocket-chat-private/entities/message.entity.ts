import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Message extends Document {

    //_id?: string;
    
    @Prop({required: true})
    email1: string;

    @Prop({required: true})
    email2: string;

    @Prop()
    message: string;

    @Prop({ default: Date.now })
    timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);