import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION_URL ="mongodb+srv://kartikkotnala20:gQAZMyOYgoJl8WIB@stack-overflow-clone.6i2fslo.mongodb.net/?retryWrites=true&w=majority&appName=stack-overflow-clone", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export default connectDB