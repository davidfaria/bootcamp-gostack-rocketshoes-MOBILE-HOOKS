import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import CurrencyFormat from 'react-currency-format';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  ProductList,
  Product,
  Image,
  Title,
  Price,
  ButtonAddToCart,
  ButtonAmount,
  ButtonAmountText,
  ButtonAddToCartText,
} from './styles';

import api from '../../services/api';

export default function Home() {
  const [products, setProducts] = useState([]);

  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount || 0;
      return sumAmount;
    }, {}),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const res = await api.get('products');
      const data = res.data.map(product => ({
        ...product,
        // priceFormatted: formatPrice(product.price),
      }));
      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  function renderProduct(product) {
    return (
      <Product>
        <Image
          alt="Tenis"
          source={{
            uri: product.image,
          }}
        />
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

        <ButtonAddToCart onPress={() => handleAddProduct(product.id)}>
          <ButtonAmount>
            <Icon name="add-shopping-cart" size={16} color="#fff" />
            <ButtonAmountText>{amount[product.id] || 0}</ButtonAmountText>
          </ButtonAmount>

          <ButtonAddToCartText>Adicionar ao carrinho</ButtonAddToCartText>
        </ButtonAddToCart>
      </Product>
    );
  }

  return (
    <Container>
      <ProductList
        data={products}
        keyExtractor={product => String(product.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => renderProduct(item)}
      />
    </Container>
  );
}
