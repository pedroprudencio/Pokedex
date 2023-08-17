import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('<Pokemon.tsx />', () => {
  test('deve renderizar um card de Pokémon com as informações corretas', () => {
    renderWithRouter(<App />);

    const nomeDoPokemon = screen.getByText(/pikachu/i);
    expect(nomeDoPokemon).toBeInTheDocument();

    const tipoDoPokemon = screen.getByTestId('pokemon-type');
    expect(tipoDoPokemon.textContent).toBe('Electric');

    const pesoDoPokemon = screen.getByTestId('pokemon-weight');
    expect(pesoDoPokemon.textContent).toBe('Average weight: 6.0 kg');

    const fotoDoPokemon = screen.getByAltText(/pikachu sprite/i);
    expect(fotoDoPokemon).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  test('deve conter um link para os detalhes do Pokémon e navegar ao ser clicado', async () => {
    renderWithRouter(<App />);

    const maisInformaçoes = screen.getByRole('link', { name: /more details/i });
    expect(maisInformaçoes).toBeInTheDocument();
    await userEvent.click(maisInformaçoes);

    const tituloPaginaDetalhes = screen.getByText(/pikachu details/i);
    expect(tituloPaginaDetalhes).toBeInTheDocument();
  });

  test('deve exibir um ícone de estrela para o Pokémon favoritado', async () => {
    renderWithRouter(<App />);

    const maisInformaçoes = screen.getByRole('link', { name: /more details/i });
    expect(maisInformaçoes).toBeInTheDocument();
    await userEvent.click(maisInformaçoes);

    const caixinhaDoFavorito = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(caixinhaDoFavorito).toBeInTheDocument();
    await userEvent.click(caixinhaDoFavorito);

    const linkdaHome = screen.getByRole('link', { name: /home/i });
    expect(linkdaHome).toBeInTheDocument();

    const iconeFavorito = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(iconeFavorito).toBeInTheDocument();
    expect(iconeFavorito).toHaveAttribute('src', '/star-icon.png');
  });
});
