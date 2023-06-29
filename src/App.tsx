import emailjs from '@emailjs/browser';
import { LoadingButton } from '@mui/lab';
import { Container, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mask } from 'remask';
import Logo from '../src/assets/logo.png';
import BackGroundAnimeted from './components/BackGroundAnimeted/html';
import { casas } from './data/casas';
import useWindowSize from './hooks/useWindowSize';
import apiPostData from './services/apiPostData';

function App() {
  const [value, setValue] = useState('');
  const [valueNumber, setValueNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { isMobile } = useWindowSize();

  async function postApi(e: React.FormEvent) {
    e.preventDefault();
    try {
      let payload = {
        ramal: parseInt(value),
        telefone: parseInt(valueNumber),
      };
      const response = await apiPostData.post('azcall/api/api.php', payload);
      console.log(response);
      setLoading(false);
      sendEmail(e);
      toast.success('Solicitação concluida. \n Aguarde a ligação no seu celular', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error('Erro ao enviar dados', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }

  function sendEmail(e: { preventDefault: () => void }) {
    e.preventDefault();

    const templateParams = {
      ramal: value,
      telefone: valueNumber,
    };

    emailjs.send('service_jl3pt8o', 'template_vfw0lqs', templateParams, 'XYukp0RgEK_NrVaTb').then(
      (response: { status: any; text: any }) => {
        console.log('email enviado', response.status, response.text);
        setValue('');
        setValueNumber('');
      },
      (err: any) => {
        console.log('error', err);
      }
    );
  }

  function handleChange(e: any) {
    setValue(e.target.value);
  }
  function handleChangeNumber(e: React.ChangeEvent<HTMLInputElement>) {
    setValueNumber(mask(e.target.value, ['99999999999']));
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
          maxHeight: '100vh',
        }}
      >
        <Typography
          variant='h5'
          sx={{
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontFamily: "'Raleway', sans-serif",
            mb: 2,
          }}
        >
          Bem vindo ao interfone virtual
        </Typography>
        <Paper
          sx={{
            width: '95%',
            height: '80%',
            borderRadius: '30px',
            backgroundColor: '#ffffff',
            overflow: isMobile ? 'scroll' : 'none',
            display: 'flex',
            alignItems: 'center',
            jusfycontent: 'center',
            boxShadow:
              ' rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
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
            <img src={Logo} style={{ maxWidth: isMobile ? '74%' : '30%', marginTop: '4rem' }} />
            <Typography
              variant='subtitle2'
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontFamily: "'Raleway', sans-serif",
              }}
            >
              Para fazer contato com o morador preencha as infomrações abaixo.
            </Typography>
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
              type='tel'
              variant='filled'
              label='Seu Número de telefone'
              helperText='Ex: (00) 90000-0000'
              value={mask(valueNumber, ['(99) 99999-9999'])}
              onChange={handleChangeNumber}
            />
            <LoadingButton
              loading={loading}
              variant='contained'
              type='submit'
              sx={{ backgroundColor: '#016f62' }}
              disabled={valueNumber === '' || value === ''}
            >
              CHAMAR
            </LoadingButton>
          </Stack>
        </Paper>
        <ToastContainer position='bottom-center' autoClose={10000} draggable theme='colored' />
      </Container>
    </>
  );
}

export default App;
