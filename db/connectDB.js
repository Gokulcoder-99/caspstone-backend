const mongoose = require('mongoose');

const Dbconnect =async()=>{
  try{
    await mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log('DB connected')
}catch(err){
  console.log(err,'DB is not connected!!!')
}
}

module.exports=Dbconnect