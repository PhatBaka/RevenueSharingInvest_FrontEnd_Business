// material
import { styled } from '@mui/material/styles';
import { Card, Typography, Box } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//
import { BookingIllustration } from '../../../assets';
import { ProjectWallet } from '../../../@types/krowd/wallet';
import { RootState, useSelector } from 'redux/store';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 2, 3),
  backgroundColor: '#14b7cc',
  color: 'black'
}));

// ----------------------------------------------------------------------

const TOTAL = 714;

export default function BookingTotal() {
  const { isLoading, walletList } = useSelector((state: RootState) => state.wallet);
  const { listOfProjectWallet } = walletList;
  const wallet = listOfProjectWallet?.p3List.find(
    (e: any) => e.projectId === localStorage.getItem('projectId')
  );
  return (
    <RootStyle>
      <div>
        <Typography variant="h6" color={'#fff'}>
          Tổng người tham gia:
          <br /> {fShortenNumber(TOTAL)}{' '}
        </Typography>
      </div>
      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral'
        }}
      >
        <Box
          component="img"
          src="/static/illustrations/illustration_project_member.png"
          sx={{
            zIndex: 9,
            width: 140,
            filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.24))'
          }}
        />
        {/* <BookingIllustration /> */}
      </Box>
    </RootStyle>
  );
}
