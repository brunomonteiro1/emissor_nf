'use client'

// React Imports
import { useEffect, useState } from 'react'

// import type { SyntheticEvent } from 'react'

// MUI Imports
import { useParams, useRouter } from 'next/navigation'

// import { useRouter } from 'next/router'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// import InputAdornment from '@mui/material/InputAdornment'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

// import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

// import Tooltip from '@mui/material/Tooltip'
// import InputLabel from '@mui/material/InputLabel'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import axios from 'axios'

import { format } from 'date-fns'

import type { InvoiceType } from '@/types/apps/invoiceTypes'
import type { FormDataType } from './AddCustomerDrawer'

// Component Imports
import AddCustomerDrawer, { initialFormData } from './AddCustomerDrawer'

// import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'
import { getLocalizedUrl } from '@/utils/i18n'
import type { Locale } from '@/configs/i18n'

// Styled Component Imports
// import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

interface ItemType {
  codigo: string
  descricao: string
  unidade: string
  quantidade: string
  valor: string
  tipo: string
}

const AddAction = ({ invoiceData }: { invoiceData: InvoiceType[] }) => {
  const { lang: locale } = useParams()
  const navigation = useRouter()

  // States
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(1)
  const [selectData, setSelectData] = useState<InvoiceType | null>(null)

  // const [issuedDate, setIssuedDate] = useState<Date | null | undefined>(null)
  // const [dueDate, setDueDate] = useState<Date | null | undefined>(null)
  const [formData, setFormData] = useState<FormDataType>(initialFormData)
  const [items, setItems] = useState<ItemType[]>([])

  const [product, setProduct] = useState<ItemType>({
    codigo: '',
    descricao: '',
    unidade: 'CX',
    quantidade: '',
    valor: '',
    tipo: 'P'
  })

  // Hooks
  const isBelowMdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const isBelowSmScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  const onFormSubmit = (data: FormDataType) => {
    setFormData(data)
  }

  useEffect(() => {
    console.log('formData', formData)
    console.log('items', items)
  }, [formData, items])

  const submitForm = async (): Promise<any> => {
    const contato = {
      nome: formData.nome,
      telefone: formData.telefone,
      email: formData.email,
      tipoPessoa: formData.tipoPessoa,
      contribuinte: formData.contribuinte,
      numeroDocumento: formData.numeroDocumento,
      endereco: {
        endereco: formData.endereco,
        numero: formData.numero,
        bairro: formData.bairro,
        complemento: formData.complemento,
        municipio: formData.municipio,
        uf: formData.uf,
        pais: formData.pais,
        cep: formData.cep
      }
    }

    const payload = {
      dados_nf: {
        contato,
        tipo: 1,
        dataOperacao: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        naturezaOperacao: { id: 15104049912 },
        finalidade: 1,
        itens: items
      },
      accountId: '1234',
      customer_id: formData.nome,
      integrator: 'bling'
    }

    const login = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sessions`, {
      email: 'kuke@kuke.com.br',
      password: '@123#Abc-Kuke'
    })

    const createNf = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/nfe`, payload, {
      headers: { Authorization: `Bearer ${login.data.token}` }
    })

    if (createNf.data.id) {
      navigation.push(getLocalizedUrl('apps/invoice/list', locale as Locale))
    }

    return createNf.data
  }

  // const deleteForm = (e: SyntheticEvent) => {
  //   e.preventDefault()

  //   // @ts-ignore
  //   e.target.closest('.repeater-item').remove()
  // }

  return (
    <>
      <Card>
        <CardContent className='sm:!p-12'>
          <Grid container spacing={6}>
            {/* <Grid item xs={12}>
              <div className='p-6 bg-actionHover rounded'>
                <div className='flex justify-between gap-4 flex-col sm:flex-row'>
                  <div className='flex flex-col gap-6'>
                    <div className='flex items-center gap-2.5'>
                      <Logo />
                    </div>
                    <div>
                      <Typography color='text.primary'>Office 149, 450 South Brand Brooklyn</Typography>
                      <Typography color='text.primary'>San Diego County, CA 91905, USA</Typography>
                      <Typography color='text.primary'>+1 (123) 456 7891, +44 (876) 543 2198</Typography>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-4'>
                      <Typography variant='h5' className='min-is-[95px]'>
                        Invoice
                      </Typography>
                      <CustomTextField
                        fullWidth
                        value={''}
                        InputProps={{
                          disabled: true,
                          startAdornment: <InputAdornment position='start'>#</InputAdornment>
                        }}
                      />
                    </div>
                    <div className='flex items-center'>
                      <Typography className='min-is-[95px] mie-4' color='text.primary'>
                        Date Issued:
                      </Typography>
                      <AppReactDatepicker
                        boxProps={{ className: 'is-full' }}
                        selected={issuedDate}
                        placeholderText='YYYY-MM-DD'
                        dateFormat={'yyyy-MM-dd'}
                        onChange={(date: Date) => setIssuedDate(date)}
                        customInput={<CustomTextField fullWidth />}
                      />
                    </div>
                    <div className='flex items-center'>
                      <Typography className='min-is-[95px] mie-4' color='text.primary'>
                        Date Due:
                      </Typography>
                      <AppReactDatepicker
                        boxProps={{ className: 'is-full' }}
                        selected={dueDate}
                        placeholderText='YYYY-MM-DD'
                        dateFormat={'yyyy-MM-dd'}
                        onChange={(date: Date) => setDueDate(date)}
                        customInput={<CustomTextField fullWidth />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Grid> */}

            <Grid item xs={12}>
              <div className='flex justify-between flex-col gap-4 flex-wrap sm:flex-row'>
                <div className='flex flex-col gap-4'>
                  <Typography className='font-medium' color='text.primary'>
                    Selecione o Cliente:
                  </Typography>
                  <CustomTextField
                    select
                    className={classnames('min-is-[220px]', { 'is-1/2': isBelowSmScreen })}
                    value={selectData?.id || ''}
                    onChange={e => {
                      setFormData({} as FormDataType)
                      setSelectData(invoiceData.slice(0, 5).filter(item => item.id === e.target.value)[0])
                    }}
                  >
                    <MenuItem
                      className='flex items-center gap-2 !text-success !bg-transparent hover:text-success hover:!bg-[var(--mui-palette-success-lightOpacity)]'
                      value=''
                      onClick={() => {
                        setSelectData(null)
                        setOpen(true)
                      }}
                    >
                      <i className='tabler-plus text-base' />
                      Add New Customer
                    </MenuItem>
                    {invoiceData.slice(0, 5).map((invoice: InvoiceType, index) => (
                      <MenuItem key={index} value={invoice.id}>
                        {invoice.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </div>
                <div className='flex flex-col gap-4'>
                  {selectData?.id ? (
                    <div>
                      <Typography>{selectData?.name}</Typography>
                      <Typography>{selectData?.company}</Typography>
                      <Typography>{selectData?.address}</Typography>
                      <Typography>{selectData?.contact}</Typography>
                      <Typography>{selectData?.companyEmail}</Typography>
                    </div>
                  ) : (
                    <div>
                      <Typography>{formData?.nome}</Typography>
                      <Typography>{formData?.numeroDocumento}</Typography>
                      <Typography>
                        {formData?.endereco}, {formData?.numero}, {formData?.bairro}, {formData?.municipio}
                      </Typography>
                      <Typography>{formData?.telefone}</Typography>
                      <Typography>{formData?.email}</Typography>
                    </div>
                  )}
                  {/* <Typography className='font-medium' color='text.primary'>
                    Bill To: $12,110.55
                  </Typography> */}
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Divider className='border-dashed' />
            </Grid>
            <Grid item xs={12}>
              {Array.from(Array(count).keys()).map((item, index) => (
                <div
                  key={index}
                  className={classnames('repeater-item flex relative mbe-4 border rounded', {
                    'mbs-8': !isBelowMdScreen,
                    '!mbs-14': index !== 0 && !isBelowMdScreen,
                    'gap-5': isBelowMdScreen
                  })}
                >
                  <Grid container spacing={5} className='m-0 pbe-5'>
                    <Grid item lg={2} md={3} xs={12}>
                      <Typography className='font-medium md:absolute md:-top-8'>Código</Typography>
                      <CustomTextField
                        {...(isBelowMdScreen && { fullWidth: true })}
                        type='text'
                        placeholder='001'
                        defaultValue=''
                        className='mbe-5'
                        onChange={e => setProduct({ ...product, codigo: e.target.value })}
                      />
                    </Grid>
                    <Grid item lg={5} md={5} xs={12}>
                      <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                        Item
                      </Typography>
                      {/* <CustomTextField select fullWidth defaultValue='App Design' className='mbe-5'>
                        <MenuItem value='App Design'>App Design</MenuItem>
                        <MenuItem value='App Customization'>App Customization</MenuItem>
                        <MenuItem value='ABC Template'>ABC Template</MenuItem>
                        <MenuItem value='App Development'>App Development</MenuItem>
                      </CustomTextField> */}
                      <CustomTextField
                        rows={1}
                        fullWidth
                        multiline
                        defaultValue=''
                        onChange={e => setProduct({ ...product, descricao: e.target.value })}
                      />
                    </Grid>
                    <Grid item lg={2} md={3} xs={12}>
                      <Typography className='font-medium md:absolute md:-top-8'>Valor</Typography>
                      <CustomTextField
                        {...(isBelowMdScreen && { fullWidth: true })}
                        type='number'
                        placeholder='10.00'
                        defaultValue=''
                        className='mbe-5'
                        onChange={e => setProduct({ ...product, valor: e.target.value })}
                      />
                      {/* <div className='flex flex-col'>
                        <Typography component='span' color='text.primary'>
                          Discount:
                        </Typography>
                        <div className='flex gap-2'>
                          <Typography component='span' color='text.primary'>
                            0%
                          </Typography>
                          <Tooltip title='Tax 1' placement='top'>
                            <Typography component='span' color='text.primary'>
                              0%
                            </Typography>
                          </Tooltip>
                          <Tooltip title='Tax 2' placement='top'>
                            <Typography component='span' color='text.primary'>
                              0%
                            </Typography>
                          </Tooltip>
                        </div>
                      </div> */}
                    </Grid>
                    <Grid item md={2} xs={12}>
                      <Typography className='font-medium md:absolute md:-top-8'>Quantidade</Typography>
                      <CustomTextField
                        {...(isBelowMdScreen && { fullWidth: true })}
                        type='number'
                        placeholder='1'
                        defaultValue=''
                        onChange={e => setProduct({ ...product, quantidade: e.target.value })}
                      />
                    </Grid>
                    {/* <Grid item md={2} xs={12}>
                      <Typography className='font-medium md:absolute md:-top-8'>Total</Typography>
                      <Typography>R$10,00</Typography>
                    </Grid> */}
                  </Grid>
                  {/* <div className='flex flex-col justify-start border-is'>
                    <IconButton size='small' onClick={deleteForm}>
                      <i className='tabler-x text-actionActive' />
                    </IconButton>
                  </div> */}
                </div>
              ))}
              <Grid item xs={12}>
                <Button
                  size='small'
                  variant='contained'
                  onClick={() => {
                    setItems([...items, { ...product }])

                    return setCount(count + 1)
                  }}
                  startIcon={<i className='tabler-plus' />}
                >
                  Adicionar
                </Button>
              </Grid>
            </Grid>
            {/* <Grid item xs={12}>
              <Divider className='border-dashed' />
            </Grid>
            <Grid item xs={12}>
              <div className='flex justify-between flex-col gap-4 sm:flex-row'>
                <div className='flex flex-col gap-4 order-2 sm:order-[unset]'>
                  <div className='flex items-center gap-2'>
                    <Typography className='font-medium' color='text.primary'>
                      Salesperson:
                    </Typography>
                    <CustomTextField defaultValue='Tommy Shelby' />
                  </div>
                  <CustomTextField placeholder='Thanks for your business' />
                </div>
                <div className='min-is-[200px]'>
                  <div className='flex items-center justify-between'>
                    <Typography>Subtotal:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      $1800
                    </Typography>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Typography>Discount:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      $28
                    </Typography>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Typography>Tax:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      21%
                    </Typography>
                  </div>
                  <Divider className='mlb-2' />
                  <div className='flex items-center justify-between'>
                    <Typography>Total:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      $1690
                    </Typography>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Divider className='border-dashed' />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='invoice-note' className='inline-flex mbe-1 text-textPrimary'>
                Note:
              </InputLabel>
              <CustomTextField
                id='invoice-note'
                rows={2}
                fullWidth
                multiline
                className='border rounded'
                defaultValue='It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
              projects. Thank You!'
              />
            </Grid> */}
          </Grid>
        </CardContent>
      </Card>
      <Grid item lg={12} xs={12}>
        <Button
          size='medium'
          variant='contained'
          onClick={submitForm}
          style={{ marginTop: 20 }}
          startIcon={<i className='tabler-send' />}
        >
          Enviar Nota
        </Button>
      </Grid>
      <AddCustomerDrawer open={open} setOpen={setOpen} onFormSubmit={onFormSubmit} />
    </>
  )
}

export default AddAction
