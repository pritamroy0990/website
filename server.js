'use strict';
require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const path = require('path');
const app = express();
const port = process.env.PORT || 4242;
if (!process.env.STRIPE_SECRET_KEY) console.warn('STRIPE_SECRET_KEY is not set. Payment checkout will be unavailable.');
const stripe = process.env.STRIPE_SECRET_KEY ? Stripe(process.env.STRIPE_SECRET_KEY) : null;
app.use(express.json({limit:'20kb'}));
app.use(express.static(path.join(__dirname)));
app.post('/api/create-checkout-session', async (req,res) => {
  try {
    if (!stripe) return res.status(503).json({error:'Online payments are not configured yet. Please contact the business.'});
    const {name,email,amount,reference,description} = req.body || {};
    if (typeof name !== 'string' || name.trim().length < 2 || name.length > 100) return res.status(400).json({error:'Enter a valid name.'});
    if (typeof email !== 'string' || email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({error:'Enter a valid email address.'});
    if (!Number.isSafeInteger(amount) || amount < 100 || amount > 10000000) return res.status(400).json({error:'Payment amount is outside the allowed range.'});
    const safeRef = typeof reference === 'string' ? reference.trim().slice(0,120) : '';
    const safeDescription = typeof description === 'string' ? description.trim().slice(0,300) : '';
    const origin = process.env.PUBLIC_SITE_URL;
    if (!origin || !/^https:\/\//i.test(origin)) return res.status(503).json({error:'The website payment URL has not been configured. Please contact the business.'});
    const session = await stripe.checkout.sessions.create({
      mode:'payment', customer_email:email.trim(), client_reference_id:safeRef || undefined,
      line_items:[{price_data:{currency:'usd',product_data:{name:'Breath Of Kindness Services payment',description:[safeRef,safeDescription].filter(Boolean).join(' — ').slice(0,500) || 'Payment for agreed services'},unit_amount:amount},quantity:1}],
      metadata:{customer_name:name.trim().slice(0,100),invoice_reference:safeRef},
      success_url:`${origin}/payment.html?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:`${origin}/payment.html?payment=cancelled`
    });
    res.json({url:session.url});
  } catch (err) {
    console.error('Stripe checkout error:',err.message);
    res.status(500).json({error:'We could not start secure checkout. Please try again or contact the business.'});
  }
});
app.listen(port,()=>console.log(`Website running on port ${port}`));
