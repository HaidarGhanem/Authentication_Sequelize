const express = require ('express')
const router = express.Router()

const { Login , Signup } = require ('../controllers/main')

router.post('/signup' , async (req,res)=>{
    const { username , email , password } = req.body
    try {
        const result = await Signup( username , email , password )
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/login' , async (req,res)=>{
    const { email , password } = req.body
    try {
        const result = await Login( email , password )
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router