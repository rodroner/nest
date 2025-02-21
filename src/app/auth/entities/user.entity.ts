import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {

    //_id?: string;
    
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

    // Array de IDs de usuarios amigos
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    friends: Types.ObjectId[]; 

    // Array de IDs de usuarios que han enviado solicitudes de amistad
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    friendRequests: Types.ObjectId[]; 
}

export const UserSchema = SchemaFactory.createForClass(User);