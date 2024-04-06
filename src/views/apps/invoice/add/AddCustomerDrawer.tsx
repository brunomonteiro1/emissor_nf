'use client'

// React Imports
import { useState } from 'react'
import type { FormEvent } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  onFormSubmit: (formData: FormDataType) => void
}

export type FormDataType = {
  nome: string
  tipoPessoa: string
  numeroDocumento: string
  contribuinte: number
  telefone: string
  email: string
  endereco: string
  bairro: string
  municipio: string
  numero: string
  complemento: string
  cep: string
  uf: string
  pais: string
}

// Vars
export const initialFormData: FormDataType = {
  nome: 'Bruno',
  tipoPessoa: 'F',
  numeroDocumento: '09796210460',
  contribuinte: 2,
  telefone: '81988413080',
  email: 'bruno@kuke.com.br',
  endereco: 'Rua Everardo Vasconcelos',
  bairro: 'Vasco da Gama',
  municipio: 'Recife',
  numero: '140',
  complemento: 'Casa',
  cep: '52081033',
  uf: 'PE',
  pais: 'Brasil'
}

// const countries = ['USA', 'UK', 'Russia', 'Australia', 'Canada']

const AddCustomerDrawer = ({ open, setOpen, onFormSubmit }: Props) => {
  // States
  const [data, setData] = useState<FormDataType>(initialFormData)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setOpen(false)
    onFormSubmit(data)
    handleReset()
  }

  const handleReset = () => {
    setOpen(false)
    setData(initialFormData)
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Add New Customer</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-6'>
        <form onSubmit={e => handleSubmit(e)} className='flex flex-col gap-5'>
          <CustomTextField
            fullWidth
            id='nome'
            label='Nome'
            value={data.nome}
            onChange={e => setData({ ...data, nome: e.target.value })}
          />
          <CustomTextField
            fullWidth
            id='tipoPessoa'
            label='Tipo'
            value={data.tipoPessoa}
            onChange={e => setData({ ...data, tipoPessoa: e.target.value })}
          />
          <CustomTextField
            fullWidth
            id='numeroDocumento'
            label='Documento'
            value={data.numeroDocumento}
            onChange={e => setData({ ...data, numeroDocumento: e.target.value })}
          />
          <CustomTextField
            fullWidth
            id='email'
            label='Email'
            value={data.email}
            onChange={e => setData({ ...data, email: e.target.value })}
          />
          <CustomTextField
            fullWidth
            id='telefone'
            type='number'
            label='Telefone'
            value={data.telefone}
            onChange={e => setData({ ...data, telefone: e.target.value })}
          />
          <CustomTextField
            fullWidth
            id='endereco'
            label='Endereço'
            value={data.endereco}
            onChange={e => setData({ ...data, endereco: e.target.value })}
          />
          <CustomTextField
            fullWidth
            id='numero'
            label='Número'
            value={data.numero}
            onChange={e => setData({ ...data, numero: e.target.value })}
          />
          <CustomTextField
            fullWidth
            id='bairro'
            label='Bairro'
            value={data.bairro}
            onChange={e => setData({ ...data, bairro: e.target.value })}
          />
          <CustomTextField
            fullWidth
            id='municipio'
            label='Municipio'
            value={data.municipio}
            onChange={e => setData({ ...data, municipio: e.target.value })}
          />
          <CustomTextField
            fullWidth
            id='complemento'
            label='complemento'
            value={data.complemento}
            onChange={e => setData({ ...data, complemento: e.target.value })}
          />
          <CustomTextField
            fullWidth
            id='cep'
            label='CEP'
            value={data.cep}
            onChange={e => setData({ ...data, cep: e.target.value })}
          />
          <CustomTextField
            fullWidth
            id='uf'
            label='UF'
            value={data.uf}
            onChange={e => setData({ ...data, uf: e.target.value })}
          />
          {/* <CustomTextField
            rows={6}
            multiline
            fullWidth
            id='address'
            label='Address'
            value={data.address}
            onChange={e => setData({ ...data, address: e.target.value })}
          /> */}
          {/* <CustomTextField
            select
            id='country'
            label='Country'
            name='country'
            variant='outlined'
            value={data?.country?.toLowerCase().replace(/\s+/g, '-') || ''}
            onChange={e => setData({ ...data, country: e.target.value })}
          >
            {countries.map((item, index) => (
              <MenuItem key={index} value={item.toLowerCase().replace(/\s+/g, '-')}>
                {item}
              </MenuItem>
            ))}
          </CustomTextField> */}
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Add
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddCustomerDrawer
