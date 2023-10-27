import { EmptyStar, FullStar, HalfStar } from '../../../utils/Star';
import { HStack, Text } from '@gluestack-ui/themed';
import React from 'react';

type Props = {
  totalRatings: number;
  rating: number;
};

export const Rating = ({ totalRatings, rating }: Props): JSX.Element => {
  return (
    <HStack alignContent="center">
      {[1, 2, 3, 4, 5].map((value, index) => {
        return rating > value ? (
          <FullStar key={index} width={18} height={18} />
        ) : rating >= index + 0.5 ? (
          <HalfStar key={index} width={18} height={18} />
        ) : (
          <EmptyStar key={index} width={18} height={18} />
        );
      })}
      <Text>{totalRatings} ratings</Text>
    </HStack>
  );
};
