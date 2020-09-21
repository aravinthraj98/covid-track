import mongoose from 'mongoose';

import UserDetailSchema from '../schema/UserDetailSchema';

const UserDetail = mongoose.model('userdetail', UserDetailSchema);

export default UserDetail;