const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate")

const UserSchema = new mongoose.Schema(
    {
        nickname:{
            type: String,
            required: true
        },

        events: {
            type: Array
        }
    }
)

UserSchema.plugin(mongoosePaginate)
mongoose.model("User", UserSchema)
