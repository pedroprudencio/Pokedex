import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Pokedex.tsx', () => {
  test('A página contém um heading h2 com o texto Encountered Pokémon:', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(heading).toBeInTheDocument();
  });

  test('É exibido o próximo Pokémon da lista quando o botão "Próximo Pokémon" é clicado:', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByTestId('next-pokemon');

    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();

    fireEvent.click(nextButton);

    const secondPokemon = screen.getByText(/charmander/i);
    expect(secondPokemon).toBeInTheDocument();
  });

  test('É mostrado apenas um Pokémon por vez:', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  test('A Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');

    typeButtons.forEach((button) => {
      expect(button).toBeInTheDocument();

      fireEvent.click(button);

      const allButton = screen.getByText(/all/i);
      fireEvent.click(allButton);

      const pikachuName = screen.getByText(/pikachu/i);
      expect(pikachuName).toBeInTheDocument();
    });
  });

  test('A Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);
    const resetButton = screen.getByText('All');
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);

    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });
});
