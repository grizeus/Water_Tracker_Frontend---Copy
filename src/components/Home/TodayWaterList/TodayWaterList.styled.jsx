import styled from '@emotion/styled';

export const TodayWrapper = styled.div`
  margin-bottom: 24px;
`;

export const TodayItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondaryPowderBlue};
`;

export const TodayInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const TodayTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  line-height: 1.25;
  color: ${({ theme }) => theme.color.black};
  margin-bottom: 16px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoint.tablet}) {
    font-size: 26px;
    line-height: 1.23;
  }
`;

export const TodayList = styled.ul`
  height: 212px;
  overflow: auto;
`;

export const TodayVolume = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 1.33;
  color: ${({ theme }) => theme.color.accent};
  margin-right: 16px;
`;

export const TodayTime = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 2;
  color: ${({ theme }) => theme.color.black};
`;

export const IconGlass = styled.svg`
  width: 26px;
  height: 26px;
  margin-right: 12px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoint.tablet}) {
    width: 36px;
    height: 36px;
  }
`;

export const TodayTools = styled.div`
  display: flex;
  gap: 18px;
`;

export const ButtonChange = styled.button`
  background-color: transparent;
  padding: 0;
  width: 20px;
  height: 20px;

  & svg {
    stroke: ${({ theme }) => theme.color.secondaryLightBlue};
    fill: transparent;
    width: 16px;
    height: 16px;
  }

  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.color.secondaryLightBlue};
  }
`;

export const ButtonDelete = styled.button`
  background-color: transparent;
  padding: 0;
  width: 20px;
  height: 20px;

  & svg {
    stroke: ${({ theme }) => theme.color.secondaryRed};
    fill: transparent;
    width: 16px;
    height: 16px;
  }

  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.color.secondaryRed};
  }
`;

export const AddWaterBtn = styled.button`
  display: flex;
  gap: 8px;
  align-items: center;
  background-color: transparent;
  color: ${({ theme }) => theme.color.accent};
  border: none;
  margin-top: 12px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
  stroke: ${({ theme }) => theme.color.accent};

  @media screen and (min-width: ${({ theme }) => theme.breakpoint.tablet}) {
    font-size: 18px;
    line-height: 1.33;
  }

  & svg {
    width: 24px;
    height: 24px;
    fill: transparent;
  }

  &:hover {
    color: ${({ theme }) => theme.color.secondaryYellow};
    stroke: ${({ theme }) => theme.color.secondaryYellow};
  }
`;


