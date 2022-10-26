const mongoose =  require('mongoose')

const orderSchema= mongoose.Schmea({
    
        user:{
            type:mongoose.Schema.Types.ObjectId,
            require: true
        },
        orderItems:[
            {
                name: {
                    type: String,
                    required: true,
                },
                image : {
                    type : String,
                    require: true,
                },
                price:{
                    type: Number,
                    required: true,
                },
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref:'Product',
                }

            }
        ],
        
    },
    {timestamps:true}
)
const Order = mongoose.model('Order', orderSchema)
export default Order