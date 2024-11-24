const Razorpay = require('razorpay'); 
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_EUId8Agf5IT88P',
    key_secret: 'jGi6D4M6OhipW8os5jBmD9H3'
});

const renderProductPage = async(req, res) => {
    try {
        res.render('product');
    } catch (error) {
        console.log(error.message);
    }
};

const createOrder = async(req, res) => {
    try {
        const amount = req.body.amount * 100; // Convert to paise
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        };

        razorpayInstance.orders.create(options, (err, order) => {
            if (!err) {
                res.status(200).send({
                    success: true,
                    msg: 'Order Created',
                    order_id: order.id,
                    amount: amount,
                    key_id: 'rzp_test_EUId8Agf5IT88P',
                    product_name: req.body.name,
                    description: req.body.description,
                    contact: "8567345632",
                    name: "Sandeep Sharma",
                    email: "sandeep@gmail.com"
                });
            } else {
                res.status(400).send({ success: false, msg: 'Something went wrong!' });
            }
        });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    renderProductPage,
    createOrder
};
