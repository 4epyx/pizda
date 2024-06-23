const express = require('express');

const synchronizeAllModels = require('./db/dbSync.js');
const deviceRouter = require('./router/deviceRouter.js');
const {addAllDevicesToMonitoring} = require('./external_api/monitoring.js')

const app = express();



synchronizeAllModels().then(()=>console.log('All tables synchronized')).then(async ()=>{
    await addAllDevicesToMonitoring()
})

app.use(express.json());

app.use((req, res, next)=> { 
    console.log(req.body);
    next();
})
app.use('/api', deviceRouter);

app.listen(3000, ()=> {
    console.log('Listening on http://localhost:3000');
})
