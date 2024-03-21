const axios = require('axios')

export default async function handler(req,res){
    const webhookUrl = `${process.env.WEBHOOK_URL}/webhook`
  
    const url = `${process.env.API_URL}/webhooks`
    const { data: webhooks } = await axios.get(url, {
      headers: { Authorization: process.env.API_KEY }
    })
  
    const findWebhook = webhook => {
      return (
        webhook.url === webhookUrl &&
        webhook.device === process.env.DEVICE &&
        webhook.status === 'active' &&
        webhook.events.includes('message:in:new')
      )
    }
  
    // If webhook already exists, return it
    const existing = webhooks.find(findWebhook)
    if (existing) {
      return existing
    }
  
    console.log(`supero el webhook, aca deberia ingresal solo al cambiar el webhook`)
    for (const webhook of webhooks) {
      // Delete previous ngrok webhooks
      if (webhook.url.includes('ngrok-free.app') || webhook.url.startsWith(webhookUrl)) {
        const url = `${process.env.API_URL}/webhooks/${webhook.id}`
        await axios.delete(url, { headers: { Authorization: process.env.API_KEY } })
      }
    }
  
    await new Promise(resolve => setTimeout(resolve, 500))
    const data = {
      url: webhookUrl,
      name: 'Chatbot',
      events: ['message:in:new'],
      device: process.env.DEVICE
    }
  
    const { data: webhook } = await axios.post(url, data, {
      headers: { Authorization: process.env.API_KEY }
    })
  
    return res.status(200).json({msg:'Web hook registrado correctamente'})
  
}