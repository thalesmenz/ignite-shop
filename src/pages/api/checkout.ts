import { stripe } from "@/lib/stripe";

export default async function handler(req, res) {
    const { Products } = req.body 
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    if (!Products) {
        return res.status(400).json({ error: 'price not found.' })
    }

    const successUrl = `${process.env.NEXT_URL}/sucess?session_id={CHECKOUT_SESSION_ID}`;

    const cancelUrl = `${process.env.NEXT_URL}/`

    const lineItems = Products.map(product => {
        return {
          price: product.defaultPriceId,
          quantity: product.quantity
        };
      });
      
      const checkoutSession = await stripe.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: 'payment',
        line_items: lineItems
      });

    return res.status(201).json({
        checkoutUrl: checkoutSession.url
    })
}