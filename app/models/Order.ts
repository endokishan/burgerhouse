import mongoose from "mongoose";
import User from "./User";

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    items: { type: Object, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    paymentStatus: { type: String, default: 'COD' },
    status: { type: String, default: 'order_placed' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);