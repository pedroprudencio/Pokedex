import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Testando o componente <About.tsx />', () => {
  test('A página contém as informações sobre a Pokédex:', () => {
    renderWithRouter(<About />);

    const aboutText = screen.getByText(/This application simulates a Pokédex/i);
    expect(aboutText).toBeInTheDocument();
  });

  test('A página contém um heading h2 com o texto About Pokédex:', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', { name: /about pokédex/i });
    expect(heading).toBeInTheDocument();
  });
  test('A página contém dois parágrafos com texto sobre a Pokédex:', () => {
    renderWithRouter(<About />);

    const paragraph1 = screen.getByText(/This application/i);
    const paragraph2 = screen.getByText(/One can filter Pokémon /i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
  test('A página contém a imagem da Pokédex:', () => {
    renderWithRouter(<About />);

    const pokedexImage = screen.getByRole('img', { name: /pokédex/i });
    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
