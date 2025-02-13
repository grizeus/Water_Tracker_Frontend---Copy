import { BaseModalWindow, ContentLoader } from 'components';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sprite from 'src/assets/images/sprite/sprite.svg';
import { format, parseISO } from 'date-fns';
import { selectIsLoading } from '../../../redux/root/rootSelectors';
import {
  addWatersThunk,
  editWaterThunk,
} from '../../../redux/waterData/waterOperations';
import {
  IconGlass,
  TodayTime,
  TodayVolume,
} from '../TodayWaterList/TodayWaterList.styled';
import {
  AddButtonSave,
  AddParagraph,
  AddTime,
  AddWater,
  BoxAddModal,
  ButtonMl,
  FooterModal,
  Icon,
  Input,
  InputTime,
  Water,
  Label,
  PreviousInfo,
} from './TodayListModal.styled';
import { formatCustomTime } from '../../../helpers/utils/dateUtils';

export const TodayListModal = ({
  initialAmount,
  initialTime,
  isEditing,
  existingRecordId,
  onClose,
  onShow,
}) => {
  const [amount, setAmount] = useState(initialAmount !== undefined || 0);
  const [time, setTime] = useState(
    isEditing && initialTime
      ? format(new Date(initialTime), 'HH:mm')
      : format(new Date(), 'HH:mm'),
  );
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectIsLoading);

  // змінити кількість води за допомогою кнопок
  const increaseAmount = () => {
    setAmount(prevAmount => prevAmount + 50);
  };
  const decreaseAmount = () =>
    setAmount(prevAmount => (prevAmount > 0 ? prevAmount - 50 : 0));

  const handleAmountChange = e => {
    let newValue = e.target.value;

    if (newValue.startsWith('0') && newValue.length > 1) {
      newValue = parseFloat(newValue.substring(1));
    }

    setAmount(parseFloat(newValue));
  };

  useEffect(() => {
    if (isEditing) {
      setAmount(initialAmount || 0);
      setTime(formatCustomTime(initialTime, 'HH:mm'));
    } else {
      setAmount(0);
      setTime(format(new Date(), 'HH:mm'));
    }
  }, [isEditing, initialAmount, initialTime]);

  const handleSubmit = () => {
    let isoDate;
    if (isEditing) {
      // Коли редагуємо, використовуємо вже встановлений час з існуючого запису
      isoDate = initialTime
        ? new Date(initialTime).toISOString().slice(0, 16)
        : new Date().toISOString();
    } else if (time) {
      // Коли створюємо новий запис і час вибрано користувачем
      const currentDate = new Date();
      const [hours, minutes] = time.split(':');
      // console.log('time: 1-й if', time); //14:40
      currentDate.setHours(hours, minutes);
      // console.log(currentDate);
      isoDate = currentDate.toISOString().slice(0, 16); // 2024-01-10T12:41

      const currentDate2 = new Date(isoDate);

      const newDate = new Date(currentDate2);
      newDate.setHours(currentDate2.getHours() + 2);

      const formattedNewDate =
        newDate.getFullYear() +
        '-' +
        ('0' + (newDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + newDate.getDate()).slice(-2) +
        'T' +
        ('0' + newDate.getHours()).slice(-2) +
        ':' +
        ('0' + newDate.getMinutes()).slice(-2);
      // console.log('Вихідна дата: фінальний', isoDate);
      // console.log('Нова дата: фінальний', formattedNewDate);
      isoDate = formattedNewDate;
    }

    const waterData = {
      time: isoDate,
      amount,
    };
    // console.log(waterData);
    if (isEditing) {
      dispatch(editWaterThunk({ _id: existingRecordId, ...waterData })).then(
        data => {
          if (!data.error) onClose();
        },
      );
    } else {
      dispatch(addWatersThunk(waterData)).then(data => {
        if (!data.error) {
          onClose();
          setAmount(0);
        }
      });
    }
  };

  const handleOnClose = () => {
    if (isEditing) {
      onClose();
      return
    }
    onClose();
    setAmount(0);
  }

  const title = isEditing ? 'Edit the entered amount of water' : 'Add water';

  const displayTime =
    isEditing && initialTime ? formatCustomTime(initialTime) : '';
  // console.log('time', time);

  return (
    <BaseModalWindow onClose={handleOnClose} onShow={onShow} title={title}>
      <BoxAddModal>
        {isEditing && (
          <PreviousInfo>
            <IconGlass>
              <use href={`${sprite}#icon-glass`}></use>
            </IconGlass>
            <TodayVolume>
              {initialAmount ? `${initialAmount} ml` : 'No notes yet'}
            </TodayVolume>
            <TodayTime>{initialTime ? `${displayTime}` : ''}</TodayTime>
          </PreviousInfo>
        )}
        <h3>{isEditing ? 'Correct entered data:' : 'Choose a value:'}</h3>
        <AddWater>
          <AddParagraph>Amount of water:</AddParagraph>
          <div>
            <ButtonMl onClick={decreaseAmount}>
              <Icon>
                <use href={`${sprite}#icon-decrement-outline`}></use>
              </Icon>
            </ButtonMl>
            <Label>
              <Water>{amount} ml</Water>
            </Label>
            <ButtonMl onClick={increaseAmount}>
              <Icon>
                <use href={`${sprite}#icon-increment`}></use>
              </Icon>
            </ButtonMl>
          </div>
        </AddWater>
        <AddTime>
          <AddParagraph>Recording time:</AddParagraph>
          <InputTime
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            step="300"
          />
        </AddTime>
        <div>
          <h3>Enter the value of the water used:</h3>
          <Input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            onBlur={() =>
              setAmount(prevAmount => prevAmount || initialAmount || 0)
            }
          />
        </div>
        <FooterModal>
          <span>{amount}ml</span>
          <AddButtonSave onClick={handleSubmit}>
            Save {isLoading && <ContentLoader />}
          </AddButtonSave>
        </FooterModal>
      </BoxAddModal>
    </BaseModalWindow>
  );
};

