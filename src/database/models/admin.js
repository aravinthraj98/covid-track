import mongoose from 'mongoose';

import adminSchema from "../schema/adminSchema"

const Admin = mongoose.model("admin",adminSchema);

export default Admin;