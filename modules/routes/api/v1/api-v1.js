const express = require('express');
const router = express.Router();

const Course = require('../../../models/course');
const {body, validationResult} = require("express-validator");

router.get('/res', (req, res) => {
    res.json('this is awewewewewe');
});

const adminRouter = express.Router();
// adminRouter.get('/course', (req, res) => {
//     res.json('ddddd')
// })
//     .post('/course', (req, res) => {
//
//         let newCourse = new Course({
//             title: req.body.title,
//             body: req.body.body,
//             price: req.body.price,
//             image: req.body.image,
//         }).save()
//
//         res.json('asdfasdf')
//
//     });


// Route handler with validation
adminRouter.post('/course', [
    // Validate username
    body('title').notEmpty().withMessage('title الزامی است'),
    body('body').notEmpty().withMessage('یوزرنیم باید زیاد باشد'),
    body('price').notEmpty().withMessage('یوزرنیم باید زیاد باشد'),
    body('image').notEmpty().withMessage('یوزرنیم باید زیاد باشد'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let newCourse = new Course({
            title: req.body.title,
            body: req.body.body,
            price: req.body.price,
            image: req.body.image,
        }).save()
        res.json('yes');
    }catch (err){
        res.json('errr')
    }

});

adminRouter.get('/course/:id',async (req, res) => {
    try {
        const doc = await Course.findById(req.params.id);
        res.json(doc);
    } catch (err) {
        res.json({status: 'err'})
    }
});
adminRouter.put('/course/:id', async (req, res) => {
    try {
        await Course.findByIdAndUpdate(req.params.id, req.body);
        res.json({status: 'success'});
    } catch (err) {
        console.log(err)
        res.json({status: 'err'})
    }
});
adminRouter.delete('/course/:id', async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({status: 'success'})
    } catch (err) {
        res.json({status: 'err'})
    }
});

router.use('/admin', adminRouter);

module.exports = router;
