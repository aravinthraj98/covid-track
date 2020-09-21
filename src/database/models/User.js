import mongoose from 'mongoose';

import UserSchema from '../schema/UserSchema';

const User = mongoose.model('user', UserSchema);

export default User;
