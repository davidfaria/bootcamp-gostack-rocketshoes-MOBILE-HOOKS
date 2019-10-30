import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import CurrencyFormat from 'react-currency-format';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native';
import {
  Container,
  Products,
  Product,
  ProductInfo,
  ProductImage,
  ProductDetail,
  Title,
  Price,
  ProductRemove,
  ProductControls,
  ProductControlButton,
  ProductControlAmount,
  ProductSubtotal,
  TotalFooterContainer,
  TotalText,
  TotalPrice,
  ButtonOrder,
  ButtonOrderText,
  EmptyContainer,
  EmptyText,
} from './styles';

import * as CartActions from '../../store/modules/cart/actions';

export default function Cart() {
  const dispatch = useDispatch();
  const products = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: product.price * product.amount,
    })),
  );

  const total = useSelector(state =>
    state.cart.reduce(
      (sumTotal, product) => sumTotal + product.price * product.amount,
      0,
    ),
  );

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function renderProduct(product) {
    return (
      <Product key={String(product.id)}>
        <ProductInfo>
          <ProductImage
            alt={product.title}
            source={{
              uri: product.image,
            }}
          />
          <ProductDetail>
            <Title>{product.title}</Title>
            <CurrencyFormat
              value={product.price}
              displayType="text"
              thousandSeparator="."
              prefix="R$"
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              renderText={value => <Price>{value}</Price>}
            />
          </ProductDetail>
          <ProductRemove
            onPress={() => dispatch(CartActions.removeFromCart(product.id))}>
            <Icon name="delete-forever" size={24} color="#7159c1" />
          </ProductRemove>
        </ProductInfo>

        <ProductControls>
          <ProductControlButton onPress={() => decrement(product)}>
            <Icon name="remove-circle-outline" size={24} color="#7159c1" />
          </ProductControlButton>
          <ProductControlAmount
            keyboardType="numeric"
            value={String(product.amount)}
          />
          <ProductControlButton onPress={() => increment(product)}>
            <Icon name="add-circle-outline" size={24} color="#7159c1" />
          </ProductControlButton>
          <ProductSubtotal>
            <CurrencyFormat
              value={product.subtotal}
              displayType="text"
              thousandSeparator="."
              prefix="R$"
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              renderText={value => <Price>{value}</Price>}
            />
          </ProductSubtotal>
        </ProductControls>
      </Product>
    );
  }

  function renderTotal() {
    return (
      <TotalFooterContainer>
        <TotalText>Total</TotalText>

        <CurrencyFormat
          value={total}
          displayType="text"
          thousandSeparator="."
          prefix="R$"
          decimalSeparator=","
          decimalScale={2}
          fixedDecimalScale
          renderText={value => <TotalPrice>{value}</TotalPrice>}
        />

        <ButtonOrder>
          <ButtonOrderText>Finalizar Pedido</ButtonOrderText>
        </ButtonOrder>
      </TotalFooterContainer>
    );
  }

  return (
    <Container>
      <ScrollView>
        {products.length ? (
          <Products>
            {products.map(product => renderProduct(product))}
            {renderTotal()}
          </Products>
        ) : (
          <EmptyContainer>
            <Icon name="remove-shopping-cart" size={64} color="#eee" />
            <EmptyText>Seu carrinho está vazio.</EmptyText>
          </EmptyContainer>
        )}
      </ScrollView>
    </Container>
  );
}
