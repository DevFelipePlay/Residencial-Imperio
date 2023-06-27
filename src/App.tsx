import { Button, Container, MenuItem, Paper, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import Logo from '../src/assets/logo.png';
import BackGroundAnimeted from './components/BackGroundAnimeted/html';

function App() {
  interface IValue {
    value: string;
    text: string;
  }

  const casas: IValue[] = [
    {
      value: '1',
      text: '1',
    },
    {
      value: '2',
      text: '2',
    },
    {
      value: '3',
      text: '3',
    },
    {
      value: '4',
      text: '4',
    },
  ];

  const [value, setValue] = useState('');

  function handleChange(e: any) {
    console.log(e.target.value);
    setValue(e.target.value);
    e.preventdefault();
  }

  return (
    <>
      <BackGroundAnimeted />
      <Container
        sx={{
          display: 'Flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Paper
          sx={{
            width: '80%',
            borderRadius: '30px',
            backgroundColor: '#ffffff',
          }}
        >
          <Stack
            component={'form'}
            spacing={2}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
            }}
          >
            <img src={Logo} style={{ maxWidth: '300px' }} />
            <TextField
              id='outlined-select-currency'
              variant='filled'
              select
              onChange={handleChange}
              value={value}
              label='Número da casa'
              helperText='Selecione o número da casa que deseja ir'
              sx={{ width: '90%' }}
            >
              {casas.map((option, index) => (
                <MenuItem
                  key={index}
                  value={option.value}
                  sx={{ alignItems: 'center', justifyContent: 'center' }}
                >
                  Casa {option.text}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              sx={{ width: '90%' }}
              type='tel'
              variant='filled'
              label='Seu Número'
              helperText='Coloque seu número de telefone'
            ></TextField>
            <Button variant='contained' type='submit' sx={{ backgroundColor: '#016f62' }}>
              Selecionar
            </Button>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default App;
