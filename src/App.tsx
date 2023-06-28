import { LoadingButton } from '@mui/lab';
import { Container, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Logo from '../src/assets/logo.png';
import BackGroundAnimeted from './components/BackGroundAnimeted/html';
import { casas } from './data/casas';
import apiPostData from './services/apiPostData';

function App() {
  const [value, setValue] = useState('');
  const [valueNumber, setValueNumber] = useState('');
  const [loading, setLoading] = useState(false);

  async function postApi(e: React.FormEvent) {
    e.preventDefault();
    try {
      let payload = {
        ramal: parseInt(value),
        telefone: parseInt(valueNumber),
      };
      const response = await apiPostData.post('azcall/api/api.php', payload, {
        headers: {
          'Acess-Control-Allow-Origin': '*',
        },
      });
      console.log(response);
      setLoading(false);
      toast.success('Tudo Certo!');
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error('Erro ao enviar dados');
    }
  }

  function handleChange(e: any) {
    setValue(e.target.value);
  }
  function handleChangeNumber(e: React.ChangeEvent<HTMLInputElement>) {
    setValueNumber(e.target.value);
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
        <Typography
          variant='h5'
          sx={{
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontFamily: "'Raleway', sans-serif",
          }}
        >
          Bem vindo ao interfone virtual
        </Typography>
        <Typography
          variant='subtitle2'
          sx={{
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontFamily: "'Raleway', sans-serif",
          }}
        >
          Para fazer contato com o morador preencha as infomrações abaixo.
        </Typography>
        <Paper
          sx={{
            width: '95%',
            borderRadius: '30px',
            backgroundColor: '#ffffff',
          }}
        >
          <Stack
            component={'form'}
            spacing={2}
            onSubmit={postApi}
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
              helperText='Selecione o número da casa que deseja falar'
              sx={{ width: '90%' }}
            >
              {casas.map((option, index) => (
                <MenuItem
                  key={index}
                  value={option.ramal}
                  sx={{ alignItems: 'center', justifyContent: 'center' }}
                >
                  {option.text}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              sx={{ width: '90%' }}
              type='number'
              variant='filled'
              label='Seu Número'
              helperText='Coloque seu número de telefone'
              value={valueNumber}
              onChange={handleChangeNumber}
            />
            <LoadingButton
              loading={loading}
              variant='contained'
              type='submit'
              sx={{ backgroundColor: '#016f62' }}
            >
              Selecionar
            </LoadingButton>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default App;
