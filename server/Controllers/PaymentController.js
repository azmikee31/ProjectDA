import Payment from "../Models/PaymentModel.js";
import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";

// @desc    Get all payments
// @route   GET /api/payments
// @access  Public
const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({});
  res.json(payments);
});

// @desc    Get payment by ID
// @route   GET /api/payments/:id
// @access  Public
const getPaymentById = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (payment) {
    res.json(payment);
  } else {
    res.status(404);
    throw new Error("Payment not found");
  }
});

// @desc    Create a new payment
// @route   POST /api/payments
// @access  Private
const createPayment = asyncHandler(async (req, res) => {
  const payment = req.query.payment;

  if (payment === "1") {
    try {
      // Lấy thông tin người dùng hiện tại
      const user = await User.findById(req.user._id);

      // Tạo thanh toán mới
      const createdPayment = await Payment.create({
        userId: req.user._id,
      });

      // Thêm thanh toán vào paymentHistory của người dùng
      user.paymentHistory.push(createdPayment);

      // Lưu người dùng để cập nhật thông tin
      await user.save();

      console.log(createdPayment);
      res.json(createdPayment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ error: "Invalid payment value" });
  }
});

// @desc    Update a payment
// @route   PUT /api/payments/:id
// @access  Private
const updatePayment = asyncHandler(async (req, res) => {
  const { userId, upgradePackage, amount } = req.body;

  const payment = await Payment.findById(req.params.id);

  if (payment) {
    payment.userId = userId;
    payment.upgradePackage = upgradePackage;
    payment.amount = amount;

    const updatedPayment = await payment.save();
    res.json(updatedPayment);
  } else {
    res.status(404);
    throw new Error("Payment not found");
  }
});

// @desc    Delete a payment
// @route   DELETE /api/payments/:id
// @access  Private
const deletePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (payment) {
    await payment.remove();
    res.json({ message: "Payment removed" });
  } else {
    res.status(404);
    throw new Error("Payment not found");
  }
});

export {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
