const mongose = require('mongose');

module.export = async function(){
    try {
        const con = await mongose.connect('localhost:27900/travel-time', {});
        if(con){
            console.log('Connected to mongodb')
        }
    } catch (error) {
        console.log(error.message);
    }
}
