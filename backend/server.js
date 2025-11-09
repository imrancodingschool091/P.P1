import app from "./app.js";
import { connectDb } from "./config/db.js";

await connectDb()


const port=process.env.PORT||8080

app.listen(port,()=>{
    console.log(`The App Is Running On Port:${port}`)
})