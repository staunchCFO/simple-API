const Subscriber = require('../models/subscribers')

class App {

    getAllSubcribers = async (req , res ) => {
         try{
            const subscribers = await Subscriber.find()
            res.json(subscribers)
         }catch(error) {
            res.status(500).json({ message: err.message })
         }
    }

    createSingleSubcriber = async ( req , res ) => {
        const subscriber = new Subscriber({
            name: req.body.name,
            subscribedChannel: req.body.subscribedChannel
        })
        
        try {
            const newSubscriber = await subscriber.save()
            res.status(201).json(newSubscriber)
            console.log(newSubscriber )
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }

    getSingleSubcriber = async (req , res) => {
        try {
            const findUser = await Subscriber.findById(req.params.id)
            if (findUser == null) {
                return res.status(404).json({ message: 'Cant find subscriber'})
              }
              res.status(201).json(findUser)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
        
    }

    removeSubscriber = async (req , res) => {
        try{
            const findUser = await Subscriber.findByIdAndDelete(req.params.id)
            if(findUser){
                Subscriber.remove()
                res.json({ message: 'Deleted This Subscriber' })
                
                
            }
            
            
        }catch (err) {
            res.status(400).json({ message: err.message })
        }
    }

    updateSubscriber = async ( req , res ) => {
        const updateUser = await Subscriber.findByIdAndUpdate(req.params.id , {
            name : req.body.name,
            subscribedChannel : req.body.subscribedChannel
        } ,{ useFindAndModify : true , new : true })
        if(updateUser){
            res.json({ message: 'Updated This Subscriber' })
        }
    }
}

const testingApp = new App()

module.exports = testingApp 