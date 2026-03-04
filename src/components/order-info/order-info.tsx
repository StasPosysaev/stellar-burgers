import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import {
  fetchOrderByNumber,
  clearOrderDetails
} from '../../services/slices/orderDetailsSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useAppDispatch();

  const { orders: feedOrders } = useAppSelector((state) => state.feed);
  const { orders: userOrders } = useAppSelector((state) => state.orders);
  const { order: loadedOrder, loading } = useAppSelector(
    (state) => state.orderDetails
  );
  const { ingredients } = useAppSelector((state) => state.ingredients);

  const existingOrder = [...feedOrders, ...userOrders].find(
    (order) => order.number === Number(number)
  );

  useEffect(() => {
    if (!existingOrder && number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }

    return () => {
      dispatch(clearOrderDetails());
    };
  }, [number, existingOrder, dispatch]);

  const orderData = existingOrder || loadedOrder;

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (loading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
