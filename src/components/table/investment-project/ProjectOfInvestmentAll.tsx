import { useEffect, useState } from 'react';

import { dispatch, RootState, useSelector } from 'redux/store';
import { DATA_TYPE, KrowdTable, RowData } from '../krowd-table/KrowdTable';
import { Typography, Box, Card, Divider } from '@mui/material';
import total from '@iconify/icons-eva/text-outline';
import time from '@iconify/icons-eva/clock-outline';
import done from '@iconify/icons-eva/checkmark-circle-2-outline';
import paytime from '@iconify/icons-eva/bell-outline';
import warning from '@iconify/icons-eva/bell-fill';
import Scrollbar from 'components/Scrollbar';
import { Icon } from '@iconify/react';
import { getInvestmentListAll } from 'redux/slices/krowd_slices/investment';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'projectId', label: 'DỰ ÁN', align: 'center' },
  { id: 'totalPrice', label: 'TRẠNG THÁI DỰ ÁN', align: 'center' },
  { id: 'investor', label: 'NHÀ ĐẦU TƯ', align: 'center' },
  { id: 'packageId', label: 'GÓI ĐẦU TƯ', align: 'center' },
  { id: 'packageId', label: 'GIÁ GÓI', align: 'center' },
  { id: 'packageId', label: 'SỐ LƯỢNG', align: 'center' },
  { id: 'totalPrice', label: 'TỔNG TIỀN', align: 'center' },
  { id: 'createDate', label: 'NGÀY ĐẦU TƯ', align: 'center' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'center' },
  { id: '', label: '', align: 'left' }
];

export default function ProjectOfInvestmentAll() {
  const { investmentAllState } = useSelector((state: RootState) => state.investment);
  const { isLoading, listOfInvestment: list, numOfInvestment, filterCount } = investmentAllState;

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    dispatch(getInvestmentListAll('', pageIndex ?? 1, 8));
  }, [pageIndex]);
  const getData = (): RowData[] => {
    if (!list) return [];
    return list.map<RowData>((_item, _idx) => {
      return {
        id: _item.id,
        items: [
          {
            name: 'idx',
            value: _idx + 1,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'projectName',
            value: _item.projectName,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'projectStatus',
            value:
              (_item.projectStatus === 'CLOSED' && 'Đã đóng') ||
              (_item.projectStatus === 'ACTIVE' && 'Đang hoạt động') ||
              (_item.projectStatus === 'WAITING_TO_ACTIVATE' && 'Đang chờ hoạt động') ||
              (_item.projectStatus === 'CALLING_TIME_IS_OVER' && 'Đã quá hạn đầu tư') ||
              (_item.projectStatus === 'CALLING_FOR_INVESTMENT' && 'Đang kêu gọi đầu tư') ||
              (_item.projectStatus === 'WAITING_TO_PUBLISH' && 'Đang chờ công khai') ||
              (_item.projectStatus === 'DENIED' && 'Đã bị từ chối') ||
              (_item.projectStatus === 'WAITING_FOR_APPROVAL' && 'Đang chờ duyệt') ||
              (_item.projectStatus === 'DRAFT' && 'Bản nháp'),
            type: DATA_TYPE.NUMBER,
            textColor:
              (_item.projectStatus === 'CALLING_FOR_INVESTMENT' && '#14b7cc') ||
              (_item.projectStatus === 'DRAFT' && 'black') ||
              (_item.projectStatus === 'WAITING_FOR_APPROVAL' && '#eacb00') ||
              (_item.projectStatus === 'WAITING_TO_ACTIVATE' && '#4dc0b5') ||
              (_item.projectStatus === 'ACTIVE' && 'green') ||
              (_item.projectStatus === 'WAITING_TO_PUBLISH' && '#f66d9b') ||
              (_item.projectStatus === 'CLOSED' && '#6574cd') ||
              (_item.projectStatus === 'DENIED' && 'red') ||
              (_item.projectStatus === 'CALLING_TIME_IS_OVER' ? 'red' : 'black')
          },
          {
            name: 'investorName',
            value: _item.investorName,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'packageName',
            value: _item.packageName,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'packagePrice',
            value: `${_item.packagePrice} đ`,
            type: DATA_TYPE.NUMBER_FORMAT
          },

          {
            name: 'quantity',
            value: `${_item.quantity} gói`,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'totalPrice',
            value: `${_item.totalPrice} đ`,
            type: DATA_TYPE.NUMBER_FORMAT,
            textColor:
              (_item.status === 'SUCCESS' && 'green') ||
              (_item.status === 'CANCELED' && 'red') ||
              (_item.status === 'WAITING' && '#eacb00') ||
              (_item.status === 'FAILED' ? 'red' : 'black')
          },
          {
            name: 'createDate',
            value: _item.createDate,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'status',
            value:
              (_item.status === 'SUCCESS' && 'Đầu tư thành công') ||
              (_item.status === 'FAILED' && 'Đầu tư thất bại') ||
              (_item.status === 'CANCELED' && 'Hủy bỏ đầu tư') ||
              (_item.status === 'WAITING' && 'Chờ xử lý'),
            type: DATA_TYPE.NUMBER,
            textColor:
              (_item.status === 'SUCCESS' && 'green') ||
              (_item.status === 'CANCELED' && 'red') ||
              (_item.status === 'WAITING' && '#eacb00') ||
              (_item.status === 'FAILED' ? 'red' : 'black')
          }
        ]
      };
    });
  };
  return (
    <>
      <Scrollbar sx={{ mb: 4 }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 5,
            width: '1500px',
            minWidth: 1000
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={total} height={40} width={40} color={'#14b7cc'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: '#14b7cc' }}>TẤT CẢ</Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {numOfInvestment} lần đầu tư{' '}
              </Typography>
            </Box>
          </Box>
          <Divider
            variant="fullWidth"
            sx={{
              borderWidth: '120px medium 1px 0px',
              borderColor: '#14b7cc',
              height: 'auto',
              alignSelf: 'stretch',
              borderStyle: 'dashed'
            }}
          />{' '}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={time} height={40} width={40} color={'#fc980b'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: '#fc980b' }}>CHỜ XỬ LÝ</Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.waiting} yêu cầu
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              borderWidth: '120px medium 1px 0px',
              borderColor: '#14b7cc',
              height: 'auto',
              alignSelf: 'stretch',
              borderStyle: 'dashed'
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={warning} height={40} width={40} color={'red'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: 'red' }}>
                ĐẦU TƯ THẤT BẠI
              </Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.failed} lần
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              borderWidth: '120px medium 1px 0px',
              borderColor: '#14b7cc',
              height: 'auto',
              alignSelf: 'stretch',
              borderStyle: 'dashed'
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={paytime} height={40} width={40} color={'#14b7cc'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: '#14b7cc' }}>
                HỦY BỎ ĐẦU TƯ
              </Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.canceled} yêu cầu
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              borderWidth: '120px medium 1px 0px',
              borderColor: '#14b7cc',
              height: 'auto',
              alignSelf: 'stretch',
              borderStyle: 'dashed'
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={done} height={40} width={40} color={'green'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: 'green' }}>
                ĐẦU TƯ THÀNH CÔNG
              </Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.success} lần{' '}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Scrollbar>
      <KrowdTable
        headingTitle={`TẤT CẢ LỊCH SỬ ĐẦU TƯ`}
        header={TABLE_HEAD}
        getData={getData}
        isLoading={isLoading}
        paging={{
          pageIndex,
          pageSize: pageSize,
          numberSize: numOfInvestment,

          handleNext() {
            setPageIndex(pageIndex + 1);
          },
          handlePrevious() {
            setPageIndex(pageIndex - 1);
          }
        }}
      />
    </>
  );
}
