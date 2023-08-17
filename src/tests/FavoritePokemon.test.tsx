import { screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente FavoritePokemon.tsx', () => {
  test('exibe mensagem quando não há Pokémon favorito', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ [] } />);

    const mensagemSemFavoritos = screen.getByText(/No favorite Pokémon found/i);
    expect(mensagemSemFavoritos).toBeInTheDocument();
  });

  test('exibe apenas os Pokémon favoritados', () => {
    const favoritePokemonList = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
      },

    ];

    renderWithRouter(<FavoritePokemon pokemonList={ favoritePokemonList } />);

    const pokemonsFavoritados = screen.queryAllByTestId('pokemon-type');
    expect(pokemonsFavoritados.length).toBe(favoritePokemonList.length);

    pokemonsFavoritados.forEach((pokemon) => {
      expect(pokemon).toHaveTextContent(/Electric/i);
    });
  });
});
