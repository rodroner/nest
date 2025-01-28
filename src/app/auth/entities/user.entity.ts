import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {

    _id?: string;
    
    @Prop({unique: true, required: true})
    email: string;

    @Prop({required: true})
    name: string;

    @Prop({minlength: 6, required: true})
    password?: string;

    @Prop({default: false})
    isActive: boolean;

    @Prop({default: false})
    isConnected: boolean;

    @Prop({type: [String], default: ['user']}) //['user', 'admin']
    roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);