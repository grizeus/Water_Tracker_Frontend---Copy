import { format } from "date-fns";

const handleProgress = state => {
  const currentAmount = state.today.dailyWaterList.reduce(
    (acc, entry) => acc + entry.amount,
    0,
  );
  const progress = ((currentAmount / state.today.dailyGoal) * 100).toFixed(0);

  state.today.progress = progress < 100 ? progress + '%' : '100%';
};

export const handlerAddWater = (state, { payload: { _id, time, amount } }) => {
  state.today.dailyWaterList.push({ _id, time, amount });
  handleProgress(state);
};

export const handleEditWater = (state, { payload }) => {
  const array = state.today.dailyWaterList;
  const idx = array.findIndex(item => item._id === payload._id);

  if (idx !== -1) {
    array[idx] = payload;
  }

  handleProgress(state);
};

export const handlerDeleteWater = (state, { payload }) => {
  state.today.dailyWaterList = state.today.dailyWaterList.filter(
    data => data._id !== payload,
  );

  handleProgress(state);
};

export const handleGetTodayWater = (state, { payload }) => {
  state.today.dailyWaterList = payload.entries;
  state.today.dailyGoal = payload.dailyGoal;
  state.today.progress = payload.progress;
};

export const handleGetMonthWater = (state, { payload }) => {
  const formattedMonth = payload.data.map(item => ({
    ...item,
    date: format(`${payload.year},${item.date}`, 'yyyy-MM-dd'),
  }));
  state.month = formattedMonth;
};
