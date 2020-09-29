import { Schema } from 'mongoose';
const Viruscases = new Schema({
    streetname: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true
    },
    locations: {
        type: Array,
        required: true
    }

});
export default UserSchema;