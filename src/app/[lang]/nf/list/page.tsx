// MUI Imports

import Grid from '@mui/material/Grid'

// Component Imports
import axios from 'axios'

import InvoiceList from '@views/apps/invoice/list'

const getData = async () => {
  // Vars
  const login = await axios.post(`${process.env.API_URL}/sessions`, {
    email: 'kuke@kuke.com.br',
    password: '@123#Abc-Kuke'
  })

  const res = await axios.get(`${process.env.API_URL}/nfe`, {
    headers: {
      Authorization: `Bearer ${login.data.token}`
    }
  })

  console.log('res', res)

  return res.data
}

const InvoiceApp = async () => {
  // Vars
  const data = await getData()

  return (
    <Grid container>
      <Grid item xs={12}>
        <InvoiceList invoiceData={data} />
      </Grid>
    </Grid>
  )
}

export default InvoiceApp
