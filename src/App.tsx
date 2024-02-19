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
import { useForm } from './hooks/useForm';
import useWindowSize from './hooks/useWindowSize';
import { IReqPostImperioSendSms } from './services/postImperioReqSendSms/IReqPostImperioSendSms';
import { getImperioSendSms } from './services/postImperioReqSendSms/postImperioSendSms';

function App() {
  const [value, setValue] = useState('');
  const [valueNumber, setValueNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { isMobile } = useWindowSize();

  const { changeForm, formData } = useForm({
    number: '',
    name: '',
  });

  // * Codigo comentado refere-se ao endpoint de ligação
  // async function postApi(e: React.FormEvent) {
  //   e.preventDefault();
  //   try {
  //     const payload = {
  //       ramal: parseInt(value),
  //       telefone: parseInt(valueNumber),
  //     };
  //     const response = await apiPostData.post('azcall/api/api.php', payload);
  //     console.log(response);
  //     setLoading(false);
  //     sendEmail(e);
  //     toast.success('Solicitação concluida. \n Aguarde a ligação no seu celular', {
  //       position: toast.POSITION.BOTTOM_CENTER,
  //     });
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //     toast.error('Erro ao enviar dados', {
  //       position: toast.POSITION.BOTTOM_CENTER,
  //     });
  //   }
  // }

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

  async function sendSms(e: any) {
    e.preventDefault();
    setLoading(true);

    const selectedCasa = casas.find((casa) => casa.number === value);

    if (!selectedCasa || selectedCasa.number.trim() === '') {
      setLoading(false);
      toast.error('A casa selecionada não tem um numero cadastrado!');
      return;
    }
    try {
      const payload: IReqPostImperioSendSms = {
        n: value,
        m: `Condominio Imperio informa: ${formData.name} esta na portaria. Entre em contato no numero ${formData.number}, ele te aguarda`,
        t: 'send',
        token: 'b67f385e535087566720889e3c6b182fce5335e01e2d7749daeeb94417300cdd',
      };
      await getImperioSendSms(payload);
      sendEmail;
      toast.success('SMS Enviado, aguarde o morador entrar em contato! ');
      console.log('Chamou');
    } catch (error) {
      console.log(error);
      toast.success('SMS enviado, aguarde o morador entrar em contato!');
    } finally {
      setLoading(false);
    }
  }

  function isValidName(name: string): boolean {
    // Remover espaços em branco no início e no final
    const trimmedName = name.trim();

    // Verificar se o nome tem dois ou mais termos
    const nameTerms = trimmedName.split(' ');
    return nameTerms.length >= 2;
  }

  function handleChange(e: any) {
    setValue(e.target.value);
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
            borderRadius: '30px',
            p: 2,
            backgroundColor: '#ffffff',
            overflow: 'scroll',
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
            onSubmit={(e) => sendSms(e)}
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
              Para fazer contato com o morador preencha as informações abaixo.
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
                  value={option.number ? option.number : option.ramal}
                  sx={{ alignItems: 'center', justifyContent: 'center' }}
                >
                  {option.text}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              sx={{ width: '90%' }}
              type='text'
              variant='filled'
              label='Digite seu nome completo'
              helperText={
                isValidName(formData.name) === true
                  ? 'Ex: João Gomes Lima'
                  : 'Escreva o nome e o sobrenome'
              }
              value={formData.name}
              error={isValidName(formData.name) === false && formData.name !== ''}
              onChange={(e) => changeForm('name', e.target.value)}
            />
            <TextField
              sx={{ width: '90%' }}
              type='tel'
              variant='filled'
              label='Seu Número de telefone'
              helperText='Ex: (00) 90000-0000'
              value={mask(formData.number, ['(99) 99999-9999'])}
              onChange={(e) => changeForm('number', mask(e.target.value, ['99999999999']))}
            />
            <LoadingButton
              loading={loading}
              variant='contained'
              type='submit'
              sx={{ backgroundColor: '#016f62' }}
              disabled={
                formData.number === '' ||
                value === '' ||
                isValidName(formData.name) === false ||
                formData.number.length < 11
              }
            >
              Solicitar
            </LoadingButton>
          </Stack>
        </Paper>
        <ToastContainer position='bottom-center' autoClose={10000} draggable theme='colored' />
      </Container>
    </>
  );
}

export default App;
