// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { NfeType } from '@/types/apps/invoiceTypes'

// Component Imports
import InvoiceListTable from './InvoiceListTable'

// import { useEffect } from 'react'

// import axios from 'axios'

// import InvoiceCard from './InvoiceCard'

const InvoiceList = ({ invoiceData }: { invoiceData: NfeType[] }) => {
  // const { data } = await axios.get('https://api.inovecoder.com.br/api/nfes');
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {/* <InvoiceCard /> */}
      </Grid>
      <Grid item xs={12}>
        <InvoiceListTable invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

export default InvoiceList
