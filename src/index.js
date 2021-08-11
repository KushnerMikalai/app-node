import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import got from 'got'
import cheerio from 'cheerio'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

/**
 * Currency Converter
 * for example:
 * curl -X GET -G http://localhost:3000/currency-converter -d from=usd -d to=byn -d amount=100
 */
app.get('/currency-converter', async (req, res) => {
  const url = 'https://myfin.us/currency-converter'
  const from = req.query.from || 'usd'
  const to = req.query.to || 'usd'
  const amount = req.query.amount || 1

  try {
    const response = await got(`${url}/${from}-${to}/${amount}`)
    const $ = cheerio.load(response.body)
    const currency = $('.conversion__value-text span:eq(1)').html()

    return res.json(currency.trim())
  } catch (e) {
    return res.send('error')
  }
});

app.get('/', async (req, res) => {
  return res.send('index')
})

app.listen(process.env.PORT, () =>
  console.log(`> PORT ${process.env.PORT}`),
)
