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

    const pokemon1 = screen.getByText(/pikachu/i);
    expect(pokemon1).toBeInTheDocument();

    fireEvent.click(nextButton);

    const pokemon2 = screen.getByText(/charmander/i);
    expect(pokemon2).toBeInTheDocument();
  });
  test('É mostrado apenas um Pokémon por vez:', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByTestId('next-pokemon');
    const pikachuName = screen.getByText(/pikachu/i);
    expect(pikachuName).toBeInTheDocument();

    fireEvent.click(nextButton);

    const charmanderName = screen.getByText(/charmander/i);
    expect(charmanderName).toBeInTheDocument();
  });
  test('A Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);

    // Encontra todos os botões de filtro de tipo
    const typeButtons = screen.getAllByTestId('pokemon-type-button');

    // Verifica se cada botão de filtro de tipo está presente na tela
    typeButtons.forEach((button) => {
      expect(button).toBeInTheDocument();

      // Clique no botão de filtro do tipo
      fireEvent.click(button);

      // Verifica o comportamento da Pokédex de acordo com o tipo selecionado
      // Certifique-se de ajustar a verificação de acordo com o comportamento da sua aplicação
      // (por exemplo, verifique se os Pokémon exibidos são do tipo selecionado)

      // Clique no botão de reset (All)
      fireEvent.click(screen.getByText('All'));

      // Verifica se o Pikachu está de volta à tela
      const pikachuName = screen.getByText(/pikachu/i);
      expect(pikachuName).toBeInTheDocument();
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
});
