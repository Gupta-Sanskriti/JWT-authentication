const router = require('express').Router();
// importing auth token to verify the header 
const authToken = require('./verifyToken');
const {postValidation} = require('../validation')
// after route we use middleware for authtoken
router.get('/', authToken,(req, res)=>{
    // res.json({
    //     posts: { 
    //         title: "my first post",
    //         description: "random data you shouldn't access"
    //     }
    // })
})
router.post('/userpost', authToken, async(req, res)=>{
    const {error} = postValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
})

module.exports = router;