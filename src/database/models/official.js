import superschema from "../schema/superschema";
import mongoose from 'mongoose';
import superSchema from "../schema/superschema";

const official = mongoose.model("superadmin",superSchema);

export default official;